# AGENTS.md — taniguchi-kyoichi.com

**taniguchi-kyoichi.com の公開ポートフォリオ**（`site/`）。
2026-10-24 に認証付きの知識基盤（api / mcp / app / ingest）を廃止し、Worker・D1・Vectorize とともに外した。

## 構成（bun workspace）

```
site/              公開 SvelteKit（Cloudflare Workers Static Assets）— apex + www
```

- パッケージマネージャ = **bun**（root が workspace、単一 `bun.lock`）。`bun install` を root で。
- Worker は `wrangler`（v4）。`bun --filter @cloud-hub/site <dev|deploy|check>`。

## Cloudflare 認証（重要・AI エージェントはこれを使う）

**秘密に触る経路は `with-secrets` だけ。** `op read` / `op run` を直接叩かない（値が会話ログに残る）。秘密値をコードや .env に直書きしない。

- デプロイ/DNS: `with-secrets --attended --profile infra <cmd>`（`CLOUDFLARE_API_TOKEN` を注入。wrangler は自動で読む。インフラを触る鍵なので `--attended` 必須）
- 必要なスコープ: Account = Workers Scripts / Workers KV（編集）、Zone(taniguchi-kyoichi.com) = DNS / Workers Routes（編集）
- Account ID: `4a8cea39f86248f053042ff4bf02c172` / Zone ID: `d3c2a2c40f9e24c540d975b6ab2c89d9`
- DNS/custom domain の API 操作（wrangler で不足時）はこのトークンで REST を叩く（例: custom domain 付替、レコード削除）。

> ローカルの `wrangler login`(OAuth) は DNS 権限が無い。DNS/custom domain 操作は必ず上記トークン（`with-secrets --attended --profile infra`）で行う。

## デプロイ

**site は main マージで自動デプロイされる**（`.github/workflows/deploy-site.yml`・`site/**` の変更のみ）。
デプロイ後に `site/scripts/verify-deploy.mjs` が走り、**ソースが出すと言っている製品が本番の
ホームに実在するか**を現物で確かめる。ここが赤なら「success なのに古い建物が配られている」。

続けて `site/scripts/verify-seo.mjs` が本番をクロールする（内部リンク・画像の宛先 / sitemap の
lastmod / noindex / robots メタの重複 / h1 の数 / title 幅 / www リダイレクト / .md の noindex）。
**SEO の壊れ方は静かで、ページは 200・見た目も正常・ビルドも green のまま進む。** 実際 README を
素通しで描いていたせいで、存在しない `/oss/LICENSE` への内部リンクが 35 ページ全部から張られた
まま数ヶ月動いていた（2026-09-06 に検出・修正）。
ローカルにも当てられる: `node site/scripts/verify-seo.mjs http://127.0.0.1:8788`

> `http://` → `https://` はゾーン設定 **Always Use HTTPS**（2026-09-06 に on）が畳む。
> www → apex は Worker の `hooks.server.ts`。**wrangler dev は Host を Worker まで通さないので、
> ホスト分岐はローカルで検証できない**（本番で verify-seo が見る）。

**手で叩くのは、CD を通さずに緊急で直すときだけ。** 2026-08-23 まで CD が無く、
PR をマージしても本番が 8/8 より前のまま止まっていた（ストックレーダーがホームに出ず、
詳細ページだけ生きていた）。**マージした ≠ 本番がそうなっている。**

```
# site（apex + www・Workers Static Assets）— 通常は CD に任せる
with-secrets --attended --profile infra bash -c 'cd site && bun run build && wrangler deploy'
```

デプロイ後は apex 200 スモーク:
`curl -sI https://taniguchi-kyoichi.com | head -1  # → HTTP/2 200`

## ⚠️ site が依存する binding / secret（落とすと機能が消える）

**Pages→Workers 移行で一度これらを落とし、AskAI と YouTube が本番から消えた**（2026-07-04・要因=古い checkout を deploy + binding/secret 未移設）。以後は必ず維持:

- **binding（`site/wrangler.jsonc` に記載・コミット済）**:
  - `kv_namespaces` → `CHAT_LIMITS`(`e1a0f7df4862482fb2cd1e9c40c4e84b`)（`/api/chat` のレート制限。1分6問・1日25問/IP・全体300問/日）
  - `compatibility_date=2025-04-01` + `nodejs_compat`（AI SDK の AsyncLocalStorage）
- **secret（Worker にサーバ側保管・wrangler.jsonc には出ない。デプロイでは消えないが、Worker 再作成時は再投入）**:
  - `ANTHROPIC_API_KEY`（AskAI。無いと「AI に質問は、いまお休みしています。」を返す）。1Password `Agent` / `Anthropic API Key portfolio`（Console workspace `portfolio` のサービスアカウント `portfolio-site-worker`）、profile `portfolio-deploy`
    - 再設定: `cd site && with-secrets --attended --profile infra with-secrets --profile portfolio-deploy bash -c 'printf %s "$ANTHROPIC_API_KEY" | npx wrangler secret put ANTHROPIC_API_KEY'`
    - 漏れたら: platform.claude.com で `portfolio-site-worker` の鍵を無効にする
  - `YOUTUBE_API_KEY`（site。ホーム/AI の YouTube 動画。無いと `getVideos` が空配列）
  - 再設定: この値は `with-secrets` のどの profile にも入っていない。人間が `cd site && with-secrets --attended --profile infra wrangler secret put <NAME>` を実行し、プロンプトに値を貼る
  - 確認: `cd site && with-secrets --attended --profile infra wrangler secret list`
- **`git pull` してから作業**（このリポは main が SSOT。古い checkout に restructure を積むと本番を巻き戻す）。

## AskAI（ホームの「AI に質問」と `/ask`）

- `/api/chat`（`site/src/routes/api/chat/+server.ts`）が AI SDK の `streamText` で **Claude（`claude-haiku-5-5`・effort low）** を呼び、UI message stream を返す。モデルは `MODEL` 定数1つ
- 答えの材料は `site/src/lib/server/tools.ts` の tool だけ。**tool が返さないことはモデルも言えない**ので、出さない物（製品の技術・プライバシーや規約の文面・非公開の製品）は tool の戻り値に入れない。プロンプトで禁じるより先にここで削る
  - 「誰のため」「なぜ作った」は `products.ts` の `audience` / `why`、本人の話と仕事の受け方は `profile.ts` の `about`
  - 非公開の製品名は `site/src/lib/server/unlisted.ts` が訪問者の文から消してからモデルへ送る（「言わないで」と書いても断りの文で名前を繰り返したため）
- カードは `MessageParts.svelte` が `tool-<name>` ごとに出す。続きの質問のチップは `followups.ts`
- Anthropic への呼び出しは **Cloudflare AI Gateway `portfolio-ai`** を通す。目的は**本当の質問のログ**（→ 落ちている質問を `site/eval/cases.ts` に足す）。ゲートウェイのキャッシュは切ってあり（`cf-aig-skip-cache`）、レート制限は KV、使いすぎの上限は Claude Console の workspace `portfolio`（月$10）が持つ
- ローカル: `cd site && with-secrets --profile portfolio-deploy bunx vite dev`（dev では KV の制限を外し、`ASKAI_MODEL` でモデルを差し替えられる。本番は常に `MODEL`）。YouTube のキーは入らないので動画は空になる

### 変えたら eval を回す（`site/eval/`）

失敗の型（意図 × 日本語/英語 × 1問目/続きの質問）から作った約60問。3層で見る:
決まった答え（空でない・期待した tool・技術名/非公開の製品名/tool 名が出ない・言語・作り話の URL が無い・公式サイトの URL）→ claude-haiku-5-5 の judge（データに基づく・質問に答えている・次の行き先がある）→ `site/eval/results/<label>.json|md`。

```
cd site
with-secrets --profile portfolio-deploy bunx vite dev            # 別のシェルで
with-secrets --profile ai bun eval/run.ts --label <名前>          # judge の鍵は ai
# 本番に当てるとき（6問/分・25問/日の制限に合わせて小さな集合を間をあけて）
with-secrets --profile ai bun eval/run.ts --target https://taniguchi-kyoichi.com --subset baseline --pace 11000 --label prod
```

**決まった答えの層は 100%、judge は前回から下げない**を出す条件にする。同じコードでも1回ごとに judge が数ポイント揺れる（2026-11-08 に同じコードで 94.5% と 98.9%）ので、**2回流して両方を見る**。モデルを変える案は同じ eval で比べてから（2026-11-08: Haiku 100%/97.8%（11-08 の日本語名の修正後 100%/97.3%・98.9%）・Sonnet 100%/95.1%・旧モデル 5.3%/38.6%）。
