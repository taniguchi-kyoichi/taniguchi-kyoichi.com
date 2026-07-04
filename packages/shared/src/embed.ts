// クラウド埋め込み: Workers AI の bge-m3（1024次元・多言語・長文）。
// ローカル e5-small(384) とは独立スタック。bge-m3 は e5 系の "query:"/"passage:" prefix 規約を持たない（生テキスト）。
// corpus も query も同一モデルで埋めることが KNN の前提（次元/モデルを混ぜない）。

export const CLOUD_MODEL = '@cf/baai/bge-m3'
export const DIM = 1024

export interface AiBinding {
  run(model: string, input: { text: string[] }): Promise<{ data: number[][]; shape?: number[] }>
}

/** 複数テキストを一括埋め込み。Workers AI の1リクエスト上限に配慮し呼び側でバッチ制御する。 */
export async function embedTexts(ai: AiBinding, texts: string[]): Promise<number[][]> {
  if (texts.length === 0) return []
  const { data } = await ai.run(CLOUD_MODEL, { text: texts })
  return data
}

export async function embedQuery(ai: AiBinding, q: string): Promise<number[]> {
  return (await embedTexts(ai, [q]))[0]
}
