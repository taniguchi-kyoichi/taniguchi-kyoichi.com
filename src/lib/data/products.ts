import type { Product } from '$lib/types';

export const products: Product[] = [
	{
		id: 'reading-memory',
		name: '読書メモリー',
		description:
			'本との出会いと対話を美しく記録する読書管理アプリ。チャット形式で読書メモを記録し、AIアシスタントと対話しながら本への理解を深められます。',
		fullDescription:
			'読書メモリーは、本棚管理・読書ノート機能を統合した、本を愛するすべての人のための読書管理アプリです。チャット形式で読書メモを記録でき、AIアシスタントと対話しながら本への理解を深めることができます。美しいビジュアル本棚で蔵書を管理し、読書統計で自分の読書傾向を把握できます。',
		type: 'app',
		status: 'production',
		platforms: ['ios'],
		links: {
			appStore: 'https://apps.apple.com/jp/app/id6751159926'
		},
		technologies: ['Swift', 'SwiftUI', 'AI'],
		thumbnail: '/reading-memory-icon.jpg',
		featured: true,
		rating: 5.0,
		ratingCount: 3,
		price: '無料',
		category: 'ブック',
		ageRating: '4+',
		features: [
			'チャット形式の読書メモ機能',
			'ビジュアル本棚管理（グリッド・リスト表示）',
			'読書ステータス管理（読みたい・読書中・読了・中断）',
			'バーコードスキャンで簡単書籍登録',
			'ジャンル・ステータス・評価別の読書統計',
			'AIアシスタントとの対話機能',
			'ダークモード対応'
		],
		privacy: {
			effectiveDate: '2026-02-14',
			dataCollection: 'standard',
			dataItems: [
				'アカウント情報（Google/Apple Sign-In）',
				'読書記録・本棚データ（Firestore クラウド同期）',
				'チャットメモ・AI対話履歴（Firestore クラウド同期）',
				'プロフィール情報・アバター画像（Cloud Storage）',
				'読書目標・アチーブメント（Firestore クラウド同期）',
				'アプリ利用状況（Firebase Analytics）'
			],
			thirdPartyServices: [
				'Firebase Authentication（ユーザー認証）',
				'Cloud Firestore（データ保存・同期）',
				'Cloud Storage for Firebase（画像保存）',
				'Firebase Analytics（利用状況分析）',
				'Claude API by Anthropic（AI対話機能）',
				'Google Books API / OpenBD（書籍情報検索）',
				'RevenueCat（サブスクリプション管理）'
			],
			analyticsUsed: true,
			contactEmail: 'info@taniguchi-kyoichi.com'
		},
		support: {
			contactEmail: 'info@taniguchi-kyoichi.com',
			faq: [
				{
					question: 'データはどこに保存されますか？',
					answer: '読書記録やメモはFirebase（Google Cloud）上に安全に保存され、デバイス間で同期されます。アカウントにログインすれば、どのデバイスからでもデータにアクセスできます。'
				},
				{
					question: 'インターネット接続は必要ですか？',
					answer: 'はい、ログインやデータの同期にインターネット接続が必要です。オフライン時もキャッシュされたデータの閲覧は可能ですが、新規登録や編集にはオンライン環境が必要です。'
				},
				{
					question: 'アカウントやデータを削除するには？',
					answer: 'プロフィール画面の「アカウント削除」からアカウントと全データを完全に削除できます。この操作は取り消せません。'
				},
				{
					question: '無料プランとプレミアムプランの違いは？',
					answer: '無料プランでは月10冊まで登録可能です。プレミアムプラン（月額¥600 / 年額¥6,000）では登録冊数無制限で全機能をご利用いただけます。'
				}
			],
			systemRequirements: 'iOS 17.0以上'
		}
	}
];

export const featuredProducts = products.filter((p) => p.featured);
