// Cloudflare Access の origin JWT 検証（edge 迂回の直アクセス backstop）。
// Managed OAuth を有効化した app は origin 検証が必須。署名鍵は約6週でローテするので JWKS を動的取得し KV に短 TTL キャッシュ。
import { createRemoteJWKSet, jwtVerify } from 'jose'

export interface AccessConfig {
  teamDomain: string   // 例: https://taniguchi.cloudflareaccess.com
  aud: string          // 各 Access app の AUD tag（app 設定に表示）
}

// createRemoteJWKSet は内部でキャッシュ+自動 refresh するので、鍵ローテはこれが吸収する（ハードコード禁止の要件を満たす）。
const jwksCache = new Map<string, ReturnType<typeof createRemoteJWKSet>>()
function jwks(teamDomain: string) {
  let j = jwksCache.get(teamDomain)
  if (!j) {
    j = createRemoteJWKSet(new URL(`${teamDomain}/cdn-cgi/access/certs`))
    jwksCache.set(teamDomain, j)
  }
  return j
}

export interface AccessIdentity { sub: string; email?: string; aud: string }

/** Cf-Access-Jwt-Assertion を検証。iss=teamDomain, aud 照合。失敗は throw。 */
export async function verifyAccessJwt(token: string, cfg: AccessConfig): Promise<AccessIdentity> {
  const { payload } = await jwtVerify(token, jwks(cfg.teamDomain), {
    issuer: cfg.teamDomain,
    audience: cfg.aud,
  })
  return { sub: String(payload.sub), email: payload.email as string | undefined, aud: cfg.aud }
}

/** Hono/Worker 用ガード。ヘッダ or cookie(CF_Authorization) から JWT を取り検証。無ければ 401。 */
export async function requireAccess(req: Request, cfg: AccessConfig): Promise<AccessIdentity> {
  const header = req.headers.get('Cf-Access-Jwt-Assertion')
  const cookie = req.headers.get('Cookie')?.match(/CF_Authorization=([^;]+)/)?.[1]
  const token = header ?? cookie
  if (!token) throw new Response('missing Access JWT', { status: 401 })
  try {
    return await verifyAccessJwt(token, cfg)
  } catch {
    throw new Response('invalid Access JWT', { status: 403 })
  }
}
