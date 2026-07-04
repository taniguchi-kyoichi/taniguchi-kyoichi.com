# AGENTS.md — taniguchi-kyoichi.com（cloud-hub モノレポ）

**taniguchi-kyoichi.com 個人クラウドハブのモノレポ**。公開ポートフォリオ(site) + 認証付き知識基盤(api/mcp) を1ドメインに束ねる。
設計 SSOT: `life/projects/cloud-hub/architecture.md`（親）+ `life/projects/life-index/cloud-architecture.md`（子）。移行手順: `MIGRATION.md`。

## 構成（bun workspace）

```
site/              公開 SvelteKit（Cloudflare Workers Static Assets）— apex + www
api/               KB API Worker（D1 FTS5 trigram + Vectorize bge-m3 + Workers AI・Access JWT gate）— api.
mcp/               remote MCP Worker（McpAgent DO → api へ service binding）— mcp.
packages/shared/   D1 schema.sql / bge-m3 embed / Vectorize検索+RRF / Access JWKS 検証
```

- パッケージマネージャ = **bun**（root が workspace、単一 `bun.lock`）。`bun install` を root で。
- 各 Worker は `wrangler`（v4）。`bun --filter @cloud-hub/<site|api|mcp> <dev|deploy|typecheck>`。

## Cloudflare 認証（重要・AI エージェントはこれを使う）

**デプロイ/DNS 用の API トークンは 1Password に格納**。秘密値をコードや .env に直書きしない。

- 格納先: 1Password **Infra-CICD** vault / item **`cloud-hub deploy taniguchi-kyoichi.com`** / field `credential`
- 参照（単発）: `op read "op://Infra-CICD/cloud-hub deploy taniguchi-kyoichi.com/credential"`
- 参照（コマンド実行）: `op run --env-file=.env.cloudflare.tpl -- wrangler deploy`
  （`.env.cloudflare.tpl` が `CLOUDFLARE_API_TOKEN` を op 参照で注入。wrangler は自動で読む）
- スコープ: Account = Workers Scripts / D1 / Vectorize / Workers AI（編集）、Zone(taniguchi-kyoichi.com) = DNS / Workers Routes（編集）
- Account ID: `4a8cea39f86248f053042ff4bf02c172` / Zone ID: `d3c2a2c40f9e24c540d975b6ab2c89d9`
- DNS/custom domain の API 操作（wrangler で不足時）はこのトークンで REST を叩く（例: custom domain 付替、レコード削除）。

> ローカルの `wrangler login`(OAuth) は DNS 権限が無い。DNS/custom domain 操作は必ず上記トークン(`op run`)で行う。

## デプロイ

```
# site（apex + www・Workers Static Assets）
op run --env-file=.env.cloudflare.tpl -- bash -c 'cd site && bun run build && wrangler deploy'
# api / mcp（Access 設定は life/projects/cloud-hub/zero-trust-runbook.md）
op run --env-file=.env.cloudflare.tpl -- bash -c 'cd api && wrangler deploy'
op run --env-file=.env.cloudflare.tpl -- bash -c 'cd mcp && wrangler deploy'
```

デプロイ後は **incognito で apex 200 スモーク**（Access に apex を飲ませない）:
`curl -sI https://taniguchi-kyoichi.com | head -1  # → HTTP/2 200`

## ⚠️ site が依存する binding / secret（落とすと機能が消える）

**Pages→Workers 移行で一度これらを落とし、AskAI と YouTube が本番から消えた**（2026-07-04・要因=古い checkout を deploy + binding/secret 未移設）。以後は必ず維持:

- **binding（`site/wrangler.jsonc` に記載・コミット済）**:
  - `ai` → `AI`（Workers AI・AskAI `/ask`,`/api/chat` の推論。APIキー不要）
  - `kv_namespaces` → `CHAT_LIMITS`(`e1a0f7df4862482fb2cd1e9c40c4e84b`)（`/api/chat` のレート制限）
  - `compatibility_date=2025-04-01` + `nodejs_compat`（AI SDK の AsyncLocalStorage）
- **secret（Worker にサーバ側保管・wrangler.jsonc には出ない。デプロイでは消えないが、Worker 再作成時は再投入）**:
  - `YOUTUBE_API_KEY`（ホーム/AI の YouTube 動画。無いと `getVideos` が空配列）。値は 1Password `op://Prod-Apps/kyoichi-portfolio YouTube Data API/credential`
  - 再設定: `cd site && op read "op://Prod-Apps/kyoichi-portfolio YouTube Data API/credential" | op run --env-file=../.env.cloudflare.tpl -- wrangler secret put YOUTUBE_API_KEY`
  - 確認: `cd site && op run --env-file=../.env.cloudflare.tpl -- wrangler secret list`
- **`git pull` してから作業**（このリポは main が SSOT。古い checkout に restructure を積むと本番を巻き戻す）。

## 状態（2026-07-04）

- site = Pages→Workers 移行 **完了・稼働中**（apex+www が cloud-hub-site Worker で 200）。**最新 main + AskAI + YouTube 全て動作確認済み**。旧 Pages プロジェクト `kyoichi-portfolio` 削除済み。
- api/mcp = scaffold 済み（typecheck clean）・**未 deploy**。次: 本番 D1/Vectorize 作成 → deploy → Zero Trust 設定 → H2 ingest（`MIGRATION.md` Step 3–6）。
