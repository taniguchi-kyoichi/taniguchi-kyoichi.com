# AGENTS.md — taniguchi-kyoichi.com（cloud-hub モノレポ）

**taniguchi-kyoichi.com 個人クラウドハブのモノレポ**。公開ポートフォリオ(site) + 認証付き知識基盤(api/mcp) を1ドメインに束ねる。
移行手順: `MIGRATION.md`。

## 構成（bun workspace）

```
site/              公開 SvelteKit（Cloudflare Workers Static Assets）— apex + www
api/               KB API Worker（D1 FTS5 trigram + Vectorize bge-m3 + Workers AI・Access JWT gate）— api.
mcp/               remote MCP Worker（McpAgent DO → api へ service binding）— mcp.
app/               Life Mirror ダッシュボード（React SPA + /api/* を api へプロキシ）— app.（Access SSO）
ingest/            life の .md → bge-m3 埋め込み → D1+Vectorize upsert（ローカル/CI・with-secrets）
packages/shared/   D1 schema.sql / bge-m3 embed / Vectorize検索+RRF / Access JWKS 検証
```

## ingest（H2・検索データ投入）

```
export CLOUDFLARE_ACCOUNT_ID=<下の Account ID> LIFE_ROOT=$HOME/life
with-secrets --attended --profile infra bun ingest/ingest.ts <file.md ...>
with-secrets --attended --profile infra bun ingest/ingest.ts --scope   # ingest/scope.ts の宣言範囲を丸ごと
```
- `CLOUDFLARE_ACCOUNT_ID` と `LIFE_ROOT` は ingest.ts が読むが profile には入っていないので自分で渡す。`LIFE_ROOT` の既定値 `/Users/kyoichi/life` はこの環境に存在しない
- life の .md をパース→チャンク(見出し境界+1500字)→Workers AI `@cf/baai/bge-m3`(1024)で埋め込み→**D1**(doc/doc_fts/heading/chunk)+**Vectorize**(id=`sha1(path)#ord`, metadata{path,heading})へ upsert。path 単位で冪等(全消し→入れ直し)。
- **公開 Worker に書込口は開けない**。ingest は全てトークン(REST)で直書き。
- ⚠️ 全 ingest はチャンク毎の D1 REST + Workers AI neuron(無料 1万/日) を消費。大量時はバッチ最適化と日次分割を検討。

- パッケージマネージャ = **bun**（root が workspace、単一 `bun.lock`）。`bun install` を root で。
- 各 Worker は `wrangler`（v4）。`bun --filter @cloud-hub/<site|api|mcp> <dev|deploy|typecheck>`。

## Cloudflare 認証（重要・AI エージェントはこれを使う）

**秘密に触る経路は `with-secrets` だけ。** `op read` / `op run` を直接叩かない（値が会話ログに残る）。秘密値をコードや .env に直書きしない。

- デプロイ/DNS: `with-secrets --attended --profile infra <cmd>`（`CLOUDFLARE_API_TOKEN` を注入。wrangler は自動で読む。インフラを触る鍵なので `--attended` 必須）
- 必要なスコープ: Account = Workers Scripts / D1 / Vectorize / Workers AI（編集）、Zone(taniguchi-kyoichi.com) = DNS / Workers Routes（編集）
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

api / mcp は自動化していない（Access の設定と絡む）ので、下記を手で叩く。

```
# site（apex + www・Workers Static Assets）— 通常は CD に任せる
with-secrets --attended --profile infra bash -c 'cd site && bun run build && wrangler deploy'
# api / mcp
with-secrets --attended --profile infra bash -c 'cd api && wrangler deploy'
with-secrets --attended --profile infra bash -c 'cd mcp && wrangler deploy'
```

デプロイ後は **incognito で apex 200 スモーク**（Access に apex を飲ませない）:
`curl -sI https://taniguchi-kyoichi.com | head -1  # → HTTP/2 200`

## ⚠️ site が依存する binding / secret（落とすと機能が消える）

**Pages→Workers 移行で一度これらを落とし、AskAI と YouTube が本番から消えた**（2026-07-04・要因=古い checkout を deploy + binding/secret 未移設）。以後は必ず維持:

- **binding（`site/wrangler.jsonc` に記載・コミット済）**:
  - `ai` → `AI`（Workers AI・AskAI `/ask`,`/api/chat` の推論。APIキー不要）
  - `kv_namespaces` → `CHAT_LIMITS`(`e1a0f7df4862482fb2cd1e9c40c4e84b`)（`/api/chat` のレート制限）
  - `compatibility_date=2025-04-01` + `nodejs_compat`（AI SDK の AsyncLocalStorage）
- **AskAI のコード側の前提（外すと「回答が返ってこない」が再発する）**:
  - `site/src/lib/server/aiBinding.ts` の `withoutDuplicatedChunks()` で binding を包む。Workers AI は 1 チャンクに同じ内容を native(`response`/`tool_calls`) と OpenAI(`choices[0].delta`) の両スロットへ入れて返し、workers-ai-provider が両方写すため、**外すとテキストが 2 重になり tool 引数が `{}{}` になって全 tool 呼び出しが落ちる**（provider 3.2.1〜4.0.0 で未修正。上流を直すまで必要）
  - tool の `inputSchema` は `tools.ts` の `toolInput()` を通す。AI SDK の zod 変換が付ける `$schema` キーが入ると **Llama 4 Scout が空の completion を返す**（テキストも tool 呼び出しも無し・エラーも出ない）
  - システムプロンプトと tool スキーマは短く保つ。Scout はプロンプト重量が増えると同じ空応答に落ちる
  - 変更したら 7 問スモーク（人物 / アプリ / OSS / 連絡 / 記事 / 動画 / 英語）で **tool-output-available が出ること**まで確認する。`/api/chat` を curl すると生の SSE が読める
- **secret（Worker にサーバ側保管・wrangler.jsonc には出ない。デプロイでは消えないが、Worker 再作成時は再投入）**:
  - `YOUTUBE_API_KEY`（site。ホーム/AI の YouTube 動画。無いと `getVideos` が空配列）
  - **api の `INTERNAL_SECRET`**（service binding mcp→api の共有シークレット。`X-Internal-Service` ヘッダ照合値。無い/不一致は Access JWT が要る）。**api と mcp の両 Worker に同値を投入**。固定値バイパス(`:1`)は塞ぎ済み
  - **mcp の `MCP_AUTH_SECRET`**（remote MCP エンドポイント `https://mcp.taniguchi-kyoichi.com/mcp` の bearer ゲート。`Authorization: Bearer <値>`）
  - **api の `GITHUB_TOKEN`**（`/api/board` が GitHub Projects #2 を GraphQL で読むためのもの。無いと `/api/board` は 503 で、Home は board 無しで描画を続ける）。**board #2 は削除済み**なので、この経路と app の board 表示は読む先を失っている（コードは残っている）
  - 再設定: これらの値は `with-secrets` のどの profile にも入っていない。人間が `cd <site|api|mcp> && with-secrets --attended --profile infra wrangler secret put <NAME>` を実行し、プロンプトに値を貼る
  - 確認: `cd site && with-secrets --attended --profile infra wrangler secret list`
- **`git pull` してから作業**（このリポは main が SSOT。古い checkout に restructure を積むと本番を巻き戻す）。
