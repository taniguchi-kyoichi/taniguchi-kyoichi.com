export type SocialPlatform =
  | "github"
  | "zenn"
  | "note"
  | "twitter"
  | "linkedin"
  | "wantedly"
  | "youtube"
  | "email"
  | "website";

export interface SocialLink {
  platform: SocialPlatform;
  url: string;
  label: string;
}

export interface Profile {
  name: string;
  nameEn: string;
  title: string;
  bio: string;
  avatar?: string;
  location?: string;
  socialLinks: SocialLink[];
  secondaryLinks?: SocialLink[];
}

export type ProductType = "app" | "web" | "service" | "library";
export type ProductStatus = "production" | "development" | "archived";
export type Platform =
  "ios" | "android" | "web" | "macos" | "windows" | "linux" | "cli";

export interface ProductLinks {
  appStore?: string;
  googlePlay?: string;
  /** 製品の公式サイト。一覧と詳細から「公式サイト」として送る */
  web?: string;
  github?: string;
  docs?: string;
}

/**
 * 規約・プライバシー・サポートの面の URL。文面はこのサイトに置かない。
 * 読書メモリー・じぶんBGM・ストックレーダーは appgrowstack-legal の Worker が同じドメインの
 * /products/<id>/… と /en/products/<id>/… で出し、ごほうび習慣は gohobishukan.com にある。
 */
export interface LegalLinks {
  support: string;
  privacy: string;
  terms: string;
  /** 英語のサポートの面。英語の面がある製品だけ */
  supportEn?: string;
}

/** 有料プランの中身。製品のページの価格の1行と AI に質問の答えに使う */
export interface SubscriptionConfig {
  /** アプリの中の呼び名（例: プレミアム） */
  planName: string;
  /** 日本の価格。例: { period: '年額', price: '¥6,000' } */
  prices: { period: string; price: string }[];
  /** 無料で使える範囲 */
  free: string[];
  /** 有料で増えるもの */
  paid: string[];
  /** 無料のお試し。例: 年額に 7 日間 / 年額に 1 か月 */
  trial?: SubscriptionTrial;
}

/** App Store の introductory offer の無料期間。長さは日か月で数える */
export interface SubscriptionTrial {
  length: number;
  unit: "day" | "month";
  /** お試しが付くプラン（日本語の画面の言葉）。例: 年額 */
  period: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  fullDescription?: string;
  type: ProductType;
  status: ProductStatus;
  platforms: Platform[];
  links: ProductLinks;
  /** 画面表示用サムネイル。WebP で小さく配信する */
  thumbnail?: string;
  /** OG / SNS カード用画像。WebP 非対応のクライアント向けに raster(JPG/PNG) を指定する。未指定なら thumbnail にフォールバック */
  ogImage?: string;
  screenshots?: string[];
  releaseDate?: string;
  featured?: boolean;
  /** 一覧・ナビから一時的に隠す（データ・ルートは残す） */
  hidden?: boolean;
  /** build in public 中。専用セクションで紹介する */
  buildInPublic?: boolean;
  version?: string;
  rating?: number;
  ratingCount?: number;
  price?: string;
  category?: string;
  ageRating?: string;
  features?: string[];
  /** 誰のためのアプリか（1〜2文）。AI に質問の答えの材料として渡す */
  audience?: string;
  /** なぜ作ったか・何の悩みをなくすか（1〜2文）。AI に質問の答えの材料として渡す */
  why?: string;
  /** 対応する OS の版。.md の版に出す */
  systemRequirements?: string;
  subscription?: SubscriptionConfig;
  legal?: LegalLinks;
  /** App Store の英語の表示名 */
  nameEn?: string;
  /** トップのカードと製品のページの見せ方。無い製品は飾りのない形で出す */
  showcase?: ProductShowcase;
}

/**
 * 製品の世界観。色はアプリの画面から取った物で、サイトのテーマ（明るい／暗い）に関係なく固定。
 * 文は使う人の言葉で書き、技術の名前と作る側の経緯は入れない。
 */
export interface ProductShowcase {
  /** 一言のキャッチ。カードの「目的の一言」も兼ねる */
  catch: string;
  /** 何のアプリかの説明1文 */
  lead: string;
  /** 使う場面を3つ */
  scenes: { title: string; body: string }[];
  /** 締めの一言（入手の直前） */
  closing: string;
  /** App Store の画面の写真（縦長・460×999）。alt は画面に何が映っているか */
  screenshots: { src: string; alt: string }[];
  theme: ProductTheme;
}

export interface ProductTheme {
  /** 地 */
  bg: string;
  /** 文字 */
  fg: string;
  /** 差し色 */
  accent: string;
  /** 補助の文字 */
  muted: string;
}

// OSS の種別。今は Swift パッケージ中心だが、将来 Claude Code プラグインや
// npm パッケージなども同じモデルで表現できるよう種別を第一級で持つ。
export type OSSKind = "swift-package" | "claude-code-plugin" | "npm-package";

export interface OSSProject {
  id: string;
  name: string;
  description: string;
  /** OSS の種別。表示のバッジとフィルタリングに使う */
  kind: OSSKind;
  /** 種別内でのグルーピング（例: 'LLM / AI', 'UI / SwiftUI'） */
  category: string;
  repository: string;
  language: string;
  topics?: string[];
  homepage?: string;
  featured?: boolean;
}

/** AI に質問で渡す本人の話。技術の名前・勤め先・住所の詳細は入れない */
export interface About {
  /** 技術の名前を入れない短い紹介 */
  bio: string;
  background: string[];
  interests: string[];
  /** 仕事の相談をどう受けるか */
  work: string;
}

export interface Contact {
  email?: string;
  formUrl?: string;
  message?: string;
}

export type ArticleSource = "zenn" | "note" | "other";

export interface Article {
  title: string;
  url: string;
  publishedAt: string;
  description?: string;
  thumbnail?: string;
  source: ArticleSource;
}

export interface YouTubeVideo {
  videoId: string;
  title: string;
  url: string;
  publishedAt: string;
  description?: string;
  thumbnail: string;
}

export interface YouTubePlaylist {
  playlistId: string;
  title: string;
  channelName: string;
  channelUrl: string;
  videos: YouTubeVideo[];
}
