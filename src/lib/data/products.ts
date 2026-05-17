import type { Product } from '$lib/types';

export const products: Product[] = [
	{
		id: 'reading-memory',
		name: '読書メモリー',
		description:
			'本との出会いを美しく記録する、読書好きのためのシンプルな読書管理アプリ。ビジュアル本棚で蔵書を眺め、チャット形式で気軽にメモを残し、自分の読書の歩みを振り返れます。',
		fullDescription:
			'読書メモリーは、本を愛するすべての人のための読書管理アプリです。読みたい本・読書中の本・読み終えた本を、美しいビジュアル本棚で眺めるように管理できます。\n\n気になった一節や考えたことは、チャット形式の読書メモで気軽に残せます。一冊との対話の記録が積み重なっていくことで、本との関係が深まり、後から読み返したときに当時の自分の感覚も一緒に蘇ります。\n\nバーコードスキャンで蔵書登録は数秒。ジャンルやステータス、評価別の読書統計で、自分がどんな読書をしてきたかを振り返れます。読書好きの世界観を大切に、装飾より本そのものが映えるデザインを目指しました。',
		type: 'app',
		status: 'production',
		platforms: ['ios'],
		links: {
			appStore: 'https://apps.apple.com/jp/app/id6751159926'
		},
		technologies: ['Swift', 'SwiftUI'],
		thumbnail: '/reading-memory-icon.jpg',
		featured: true,
		rating: 5.0,
		ratingCount: 3,
		price: '無料',
		category: 'ブック',
		ageRating: '4+',
		features: [
			'美しいビジュアル本棚（グリッド・リスト表示）',
			'チャット形式の気軽な読書メモ',
			'読書ステータス管理（読みたい・読書中・読了・中断）',
			'バーコードスキャンで蔵書登録',
			'ジャンル・ステータス・評価別の読書統計',
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
	},
	{
		id: 'rein',
		name: 'Rein',
		description:
			'意志じゃなくて、仕組み。ダイエット・運動・コミュニケーション・スマホ習慣のつまずきを認知科学で見直し、自分との付き合い方を変えていく iOS アプリ。',
		fullDescription:
			'Rein は、頑張りや意志の力で自分を変えるのではなく、自分の状態を観察して、付き合い方を少しずつ変えていくためのアプリです。\n\n暴飲暴食、運動が続かない、人にうまく連絡できない、気づいたらスマホを開いている — そういう日常のつまずきを「直すべき欠陥」ではなく「自分を知るサイン」として扱います。失敗したときも、責めるのではなく、次の一歩を選び直すための手がかりに変えます。\n\n強制せず、押し付けず、卒業も自由。使わなくなったらそれでよく、また戻ってきてもいいアプリを目指しています。',
		type: 'app',
		status: 'development',
		platforms: ['ios'],
		links: {},
		technologies: ['Swift', 'SwiftUI', 'Foundation Models', 'Firebase'],
		thumbnail: '/rein-icon.png',
		featured: true,
		price: '無料（プレミアム予定）',
		category: 'ヘルスケア/フィットネス',
		ageRating: '4+',
		features: [
			'ダイエット・運動・コミュニケーション・スマホ習慣の 4 つを 1 つのアプリで',
			'衝動や停滞を「サイン」として記録し、自分を観察できる',
			'失敗を責めずに、次の一歩を選び直すリフレクション',
			'押し付けない、そっと差し出すデザイン',
			'いつでも卒業できる、戻ってきてもいい設計'
		]
	}
];

export const featuredProducts = products.filter((p) => p.featured);
