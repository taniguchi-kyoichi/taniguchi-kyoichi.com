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
  /** 目的・法的根拠・移転・保存期間・削除と開示の求め方など、アプリごとに書く節。「第三者サービス」の後に順に出す */
  sections?: PrivacySection[];
  contactEmail: string;
}

export interface PrivacySection {
  title: string;
  paragraphs?: string[];
  items?: string[];
}

export interface SupportConfig {
  contactEmail: string;
  faq?: { question: string; answer: string }[];
  systemRequirements?: string;
}

/** 自動更新サブスクリプションの条件。利用規約のページ（/products/<id>/terms）とサポートのページに出す */
export interface SubscriptionConfig {
  /** アプリの中の呼び名（例: プレミアム） */
  planName: string;
  /** 日本の価格。例: { period: '年額', price: '¥6,000' } */
  prices: { period: string; price: string }[];
  /** 無料で使える範囲 */
  free: string[];
  /** 有料で増えるもの */
  paid: string[];
  /** 購入を復元する手順（アプリの画面の言葉のまま） */
  restoreSteps: string[];
  /** 英語の手順。画面の言葉は日本語のまま「」で残す */
  restoreStepsEn: string[];
  /** 補足（旧プランの扱いなど） */
  notes?: string[];
  /** 無料のお試し。例: 年額に 7 日間 / 年額に 1 か月 */
  trial?: SubscriptionTrial;
}

/** App Store の introductory offer の無料期間。長さは日か月で数える */
export interface SubscriptionTrial {
  length: number;
  unit: "day" | "month";
  /** お試しが付くプラン（日本語の画面の言葉）。例: 年額 */
  period: string;
  /** 英語の文に入れる形。例: annual */
  periodEn: string;
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
  subscription?: SubscriptionConfig;
  /**
   * 法務・サポートの英語のページ（/en/products/<id>/terms|privacy|support）の文面。
   * 日本語のページの訳で、意味を足し引きしない。無ければ英語のページは 404。
   */
  en?: ProductEnglish;
}

/** 日本語のデータ（privacy / support / subscription）のうち、文面の項目だけを英語にしたもの */
export interface ProductEnglish {
  /** App Store の英語の表示名 */
  name: string;
  privacy?: Pick<PrivacyConfig, "dataItems" | "thirdPartyServices" | "sections">;
  support?: Pick<SupportConfig, "faq" | "systemRequirements">;
  subscription?: {
    planName: string;
    prices: { period: string; price: string }[];
    free: string[];
    paid: string[];
    /** アプリの英語の画面の言葉で書いた手順 */
    restoreSteps: string[];
    notes?: string[];
  };
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
