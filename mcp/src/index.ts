// remote MCP（read の関所）。ローカル tools/life-index/src/mcp.ts のツール面をそのまま写し、
// 実体は api Worker へ service binding(RPC) でプロキシする。McpAgent = DO で session/hibernation を得る。
//
// ⚠️ scaffold: agents SDK(v0.6.x) の McpAgent マウント API は流動的。実装時に公式 examples で serve/mount 形を確認する。
import { McpAgent } from 'agents/mcp'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { z } from 'zod'

export interface Env {
  API: Fetcher            // service binding → cloud-hub-api
  MCP_OBJECT: DurableObjectNamespace
  ACCESS_TEAM_DOMAIN: string
}

const json = (data: unknown) => ({ content: [{ type: 'text' as const, text: JSON.stringify(data, null, 2) }] })

export class LifeIndexMCP extends McpAgent<Env> {
  server = new McpServer({ name: 'life-index', version: '0.1.0' })

  // api への内部呼び出し（service binding）。X-Internal-Service で api 側の Access を迂回。
  private async api(path: string, params: Record<string, string | undefined> = {}) {
    const qs = new URLSearchParams(
      Object.entries(params).filter(([, v]) => v != null) as [string, string][],
    ).toString()
    const res = await this.env.API.fetch(`https://api.internal${path}${qs ? '?' + qs : ''}`, {
      headers: { 'X-Internal-Service': '1' },
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

    this.server.registerTool('related', {
      title: '類似文書', description: '指定 path に意味的に近い文書を返す。',
      inputSchema: { path: z.string(), limit: z.number().optional() },
    }, async (a) => json(await this.api('/api/related', { path: a.path, limit: a.limit?.toString() })))

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
export default LifeIndexMCP.serve('/mcp')
