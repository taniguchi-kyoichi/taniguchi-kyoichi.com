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
  web?: string;
  github?: string;
  docs?: string;
}

export interface PrivacyConfig {
  effectiveDate: string;
  dataCollection: "none" | "minimal" | "standard";
  dataItems?: string[];
  thirdPartyServices?: string[];
  analyticsUsed?: boolean;
  contactEmail: string;
}

export interface SupportConfig {
  contactEmail: string;
  faq?: { question: string; answer: string }[];
  systemRequirements?: string;
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
  technologies: string[];
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
  privacy?: PrivacyConfig;
  support?: SupportConfig;
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

export interface Contact {
  email?: string;
  formUrl?: string;
  message?: string;
}

export type ArticleSource = "zenn" | "note" | "rein" | "other";

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
