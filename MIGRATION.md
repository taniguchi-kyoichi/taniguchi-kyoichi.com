# cloud-hub モノレポ化 + Cloudflare 移行 runbook

このリポ（kyoichi-portfolio）を **taniguchi-kyoichi.com 個人ハブのモノレポ**へ拡張する実行手順。
設計 SSOT: `life/projects/cloud-hub/architecture.md`。認証: `life/projects/cloud-hub/zero-trust-runbook.md`。

## 現状（2026-07-04 更新）

- ✅ **モノレポ化完了**（bun workspace）: `site/`(公開・Workers Static Assets)・`api/`・`mcp/`・`packages/shared/`。
- ✅ **site の Pages→Workers cutover 完了・稼働中**: apex `taniguchi-kyoichi.com` + `www` が Worker `cloud-hub-site` で **HTTP 200**。旧 Pages プロジェクト `kyoichi-portfolio` は削除済み。apex の Pages 残骸 CNAME は削除し Worker custom domain へ付替済み。
- ✅ **デプロイ用 API トークンを 1Password 化**（下 Step 1）。DNS/custom domain 操作も自動化可能に。
- ⏳ **api/mcp = 未 deploy**（scaffold 済・typecheck clean）。次は Step 3–6。

## Step 1 — Cloudflare 認証（トークン運用・確立済み）

DNS/custom domain 操作は OAuth では権限不足。**1Password のデプロイトークンを使う**（`AGENTS.md` 参照）:
```
# コマンド実行時（wrangler が CLOUDFLARE_API_TOKEN を自動使用）
op run --env-file=.env.cloudflare.tpl -- wrangler <...>
# 単発取得
op read "op://Infra-CICD/cloud-hub deploy taniguchi-kyoichi.com/credential"
```
item: 1Password Infra-CICD / `cloud-hub deploy taniguchi-kyoichi.com`。
scope: Workers Scripts/D1/Vectorize/Workers AI(acct) + DNS/Workers Routes(zone taniguchi-kyoichi.com)。

## Step 2 — Workers Paid 有効化（要判断①=承認済み）

Dashboard → Workers & Pages → Plans → **Workers Paid ($5/mo)**。Vectorize/KV-DO/cron の前提。

## Step 3 — リソース作成（remote）

```
# 3-1 使い捨て D1 で trigram を authoritative に再確認 → 削除（--local で実証済みの最終確認）
wrangler d1 create life-index-trigram-probe
wrangler d1 execute life-index-trigram-probe --remote --file=life/.../d1-trigram-probe/schema.sql
wrangler d1 execute life-index-trigram-probe --remote --file=life/.../d1-trigram-probe/queries.sql
wrangler d1 delete life-index-trigram-probe          # disposable

# 3-2 本番リソース
wrangler d1 create life-index                        # → database_id を api/wrangler.jsonc に貼る
wrangler vectorize create life-index --dimensions=1024 --metric=cosine   # bge-m3=1024
# schema 適用
wrangler d1 execute life-index --remote --file=packages/shared/schema.sql
```

## Step 4 — root を bun workspace 化 + site 移設（Pages→Workers-assets cutover）

> ⚠️ live apex を触る。**必ず preview で確認してから DNS フリップ**。adapter-cloudflare v7 + wrangler v4 前提（現状 wrangler v3 → devDeps 更新）。実装時に SvelteKit/Cloudflare 公式 docs で v7 の Workers-assets 出力形を確認すること。

1. **site 移設**: `git mv` で SvelteKit 一式を `site/` へ（`src static svelte.config.js vite.config.ts tsconfig.json package.json bun.lock .env* Makefile`）。`.git`/`node_modules` は root 据え置き。
2. **site/wrangler.jsonc**（Pages 設定を Workers-assets へ差し替え）:
   ```jsonc
   {
     "name": "cloud-hub-site",
     "compatibility_date": "2026-07-01",
     "compatibility_flags": ["nodejs_compat"],
     "main": ".svelte-kit/cloudflare/_worker.js",
     "assets": { "directory": ".svelte-kit/cloudflare", "binding": "ASSETS" },
     "routes": [
       { "pattern": "taniguchi-kyoichi.com", "custom_domain": true },
       { "pattern": "www.taniguchi-kyoichi.com", "custom_domain": true }
     ]
   }
   ```
   旧 `wrangler.toml`(`pages_build_output_dir`) は削除。adapter は wrangler config を見て Workers 出力に切替わる。
3. **root package.json** を workspace 化:
   ```jsonc
   { "name": "cloud-hub", "private": true, "workspaces": ["site", "api", "mcp", "packages/*"] }
   ```
4. **ビルド検証（deploy しない）**: `cd site && bun install && bun run build && wrangler dev`（localhost で表示確認）。
5. **cutover**: `wrangler deploy`（site）。apex custom_domain が Pages から Workers へ移る。
6. **apex スモーク（incognito・未ログイン）**:
   ```
   curl -sI https://taniguchi-kyoichi.com | head -1   # HTTP/2 200（公開維持）
   ```
   200 でなければ即ロールバック（旧 Pages を戻す）。

## Step 5 — api / mcp デプロイ

```
cd api  && wrangler deploy      # api.taniguchi-kyoichi.com（custom domain 自動）
cd ../mcp && wrangler deploy    # mcp.taniguchi-kyoichi.com
```
その後 `zero-trust-runbook.md` に沿って Access app（app./api./mcp.）+ Managed OAuth + Service Token を設定。
各 app の AUD tag を `api/wrangler.jsonc` の `ACCESS_AUD` に反映して再 deploy。

## Step 6 — H2 ingest（索引投入）

git push → GitHub Action で **差分 upsert**（ローカル実装済み差分索引の決定的 ID を流用）:
- 変更 .md をパース → chunk 化 → Workers AI bge-m3 で埋め込み → **D1(doc/doc_fts/heading/chunk) + Vectorize(vector, id=`sha1(path)#ord`, metadata={path,heading})** へ upsert。
- 認証は Service Token（`CF-Access-Client-Id/Secret`）で api の内部 ingest エンドポイント（別途追加）を叩く。
- cloud index は **derived・disposable**（SSOT は git）。壊れたら全再構築可。

## スモークの完了定義

- [ ] remote D1 で trigram 日本語ヒット確認 → probe 削除
- [ ] apex/www が未ログイン 200（公開維持）
- [ ] app./api./mcp. が未ログイン 302 / ログイン 200
- [ ] Claude から mcp. に OAuth 接続 → `search` が日本語で引ける
