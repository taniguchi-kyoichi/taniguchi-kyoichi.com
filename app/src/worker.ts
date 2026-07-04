// app（Life Mirror ダッシュボード）の Worker エントリ。
// - /api/* → service binding で cloud-hub-api へプロキシ（INTERNAL_SECRET を付与）。
// - それ以外 → 静的アセット（React SPA）。SPA ルーティングは assets の single-page-application。
// mcp/api と違い自前 auth は持たず、mcp. と同様 edge の Cloudflare Access(SSO) で人間だけを通す前提。
export interface Env {
  ASSETS: Fetcher
  API: Fetcher            // service binding → cloud-hub-api
  INTERNAL_SECRET: string // api の X-Internal-Service 照合値（app→api を通す）
}

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url)
    if (url.pathname.startsWith('/api/')) {
      const proxied = new Request(`https://api.internal${url.pathname}${url.search}`, req)
      proxied.headers.set('X-Internal-Service', env.INTERNAL_SECRET)
      return env.API.fetch(proxied)
    }
    return env.ASSETS.fetch(req)
  },
}
