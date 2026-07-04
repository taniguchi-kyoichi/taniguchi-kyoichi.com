// remote MCP（read の関所）。ローカル tools/life-index/src/mcp.ts のツール面を写し、
// 実体は api Worker へ service binding(RPC) でプロキシする。McpAgent = DO で session/hibernation を得る。
// agents v0.0.80: McpAgent(abstract server/init) + static serve(path,{binding:'MCP_OBJECT'})。
import { McpAgent } from 'agents/mcp'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { z } from 'zod'

export interface Env {
  API: Fetcher            // service binding → cloud-hub-api
  MCP_OBJECT: DurableObjectNamespace
  INTERNAL_SECRET: string // api と共有。X-Internal-Service で service binding 経路を通す
  MCP_AUTH_SECRET: string // mcp エンドポイント自体の bearer ゲート（Access/OAuth を張るまでの認証）
}

const json = (data: unknown) => ({ content: [{ type: 'text' as const, text: JSON.stringify(data, null, 2) }] })

export class LifeIndexMCP extends McpAgent<Env> {
  server = new McpServer({ name: 'life-index', version: '0.1.0' })

  // api への内部呼び出し（service binding）。共有シークレットで api 側の Access ゲートを通す。
  private async api(path: string, params: Record<string, string | undefined> = {}) {
    const qs = new URLSearchParams(
      Object.entries(params).filter(([, v]) => v != null) as [string, string][],
    ).toString()
    const res = await this.env.API.fetch(`https://api.internal${path}${qs ? '?' + qs : ''}`, {
      headers: { 'X-Internal-Service': this.env.INTERNAL_SECRET },
    })
    return res.json()
  }

  async init() {
    this.server.registerTool('search', {
      title: '検索（hybrid/全文/意味）',
      description: 'life リポを検索。mode=hybrid(既定・全文+意味のRRF)/fts(trigram全文・日本語)/semantic。本文でなく snippet+path を返す。',
      inputSchema: {
        q: z.string(), mode: z.enum(['hybrid', 'fts', 'semantic']).optional(),
        category: z.string().optional(), dateFrom: z.string().optional(),
        dateTo: z.string().optional(), limit: z.number().optional(),
      },
    }, async (a) => json(await this.api('/api/search', {
      q: a.q, mode: a.mode, category: a.category, dateFrom: a.dateFrom, dateTo: a.dateTo,
      limit: a.limit?.toString(),
    })))

    // TODO: related（類似文書）は api 側に /api/related（Vectorize getByIds→近傍）を実装後に追加。

    this.server.registerTool('get', {
      title: '文書取得', description: 'path 指定で frontmatter 解析済み本文を取得する。',
      inputSchema: { path: z.string() },
    }, async (a) => json(await this.api('/api/doc', { path: a.path })))

    this.server.registerTool('outline', {
      title: '見出し俯瞰', description: '本文を読まず見出しツリーだけ安価に取得する。',
      inputSchema: { path: z.string() },
    }, async (a) => json(await this.api('/api/outline', { path: a.path })))

    this.server.registerTool('list', {
      title: '列挙', description: 'category/status で絞って新しい順に列挙。status は canonical 6値。',
      inputSchema: {
        category: z.string().optional(),
        status: z.enum(['inbox', 'draft', 'in-progress', 'blocked', 'done', 'archived']).optional(),
        limit: z.number().optional(),
      },
    }, async (a) => json(await this.api('/api/list', { category: a.category, status: a.status, limit: a.limit?.toString() })))

    this.server.registerTool('facets', {
      title: 'ファセット', description: 'category/status/tag 別の件数分布と総数。',
      inputSchema: {},
    }, async () => json(await this.api('/api/facets')))
  }
}

// Streamable HTTP でマウント。/mcp を remote MCP エンドポイントに。
const mcpHandler = LifeIndexMCP.serve('/mcp')

// bearer ゲート: MCP_AUTH_SECRET があれば Authorization: Bearer 一致を要求（KB を公開露出させない）。
// 将来 mcp. に Access/Managed OAuth を張る場合はこのゲートを外し edge 認証に委ねる。
export default {
  async fetch(req: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const sec = env.MCP_AUTH_SECRET
    if (sec) {
      const auth = req.headers.get('Authorization')
      if (auth !== `Bearer ${sec}`) return new Response('unauthorized', { status: 401 })
    }
    return mcpHandler.fetch(req, env, ctx)
  },
}
