-- cloud-hub / life-index D1 スキーマ（H2 read mirror）
-- ローカル tools/life-index/src/db.ts の initSchema を D1 向けに移植:
--   ・sqlite-vec(vec0) は削除 → ベクトルは Vectorize（外部・1024次元 bge-m3）へ
--   ・PRAGMA journal_mode は D1 管理下なので指定しない
--   ・doc.body を追加（クラウドは FS が無いので /doc の本文取得元に。derived・disposable）
-- trigram tokenizer は使い捨て D1 で実証済み（3文字下限の制約あり→2文字語は Vectorize が補完）。

CREATE TABLE IF NOT EXISTS doc(
  path TEXT PRIMARY KEY,
  title TEXT, category TEXT, created TEXT,
  status TEXT, status_raw TEXT, tags TEXT,
  mtime INTEGER, body_len INTEGER, content_hash TEXT,
  body TEXT               -- クラウド固有: /doc の本文返却元
);

-- 全文（trigram で日本語=分かち書きなしに対応）。本番ローカルと同一定義。
CREATE VIRTUAL TABLE IF NOT EXISTS doc_fts USING fts5(
  path UNINDEXED, title, body, tokenize='trigram'
);

CREATE TABLE IF NOT EXISTS heading(path TEXT, level INTEGER, text TEXT, ord INTEGER);
CREATE TABLE IF NOT EXISTS link(src TEXT, dst TEXT);

-- チャンク（Vectorize の id = 'sha1(path)#ord' で決定的に紐付け、冪等 upsert）。
CREATE TABLE IF NOT EXISTS chunk(
  id TEXT PRIMARY KEY,     -- 決定的 ID（Vectorize の vector id と一致）
  path TEXT, heading TEXT, ord INTEGER, text TEXT
);

-- HTML 成果物（自己完結HTML）。埋め込みはしない = 丸ごとレンダリングする成果物。
-- 意味検索はソース .md 側が担い、これは "見る" 対象。html 本文を D1 に保持（repo は private ＝ raw 配信不可）。
CREATE TABLE IF NOT EXISTS artifact(
  path TEXT PRIMARY KEY,   -- repo 相対 .html パス
  title TEXT, theme TEXT, created TEXT,
  content_hash TEXT, html TEXT
);

CREATE INDEX IF NOT EXISTS idx_doc_category ON doc(category);
CREATE INDEX IF NOT EXISTS idx_doc_created ON doc(created);
CREATE INDEX IF NOT EXISTS idx_heading_path ON heading(path);
CREATE INDEX IF NOT EXISTS idx_chunk_path ON chunk(path);
CREATE INDEX IF NOT EXISTS idx_artifact_created ON artifact(created);

-- 索引メタ（last_ingest 等）。hub が「索引の鮮度」を映すため。
CREATE TABLE IF NOT EXISTS meta(key TEXT PRIMARY KEY, value TEXT);
