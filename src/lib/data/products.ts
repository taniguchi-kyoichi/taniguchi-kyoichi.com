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
			'なりたい自分の、操縦席へ。意志力ではなく「自分の状態とのつき合い方」を変えるセルフマネジメント iOS アプリ。ダイエット・運動・コミュニケーション・デジタル習慣の 4 ドメインで、衝動や停滞を「直すべき欠陥」ではなく「自分を知るサイン」として扱う。',
		fullDescription:
			'Rein は「人々がセルフマネジメントをできるようになる社会」を目指す iOS アプリです。Rein (手綱) というメタファーが示すように、自分という馬を殺さず・縛らず、対話しながら方向を示します。\n\nアプローチは「治療」ではなく「同伴」。衝動も停滞も病気ではなく自分の状態が送る情報として扱い、失敗は敗北ではなく次の一歩を選ぶための手がかりとして扱います。意志力で変えるのではなく、自分の状態とのつき合い方を変えることで、長期的に「こうなりたい」と思う未来へ自分を操縦していきます。\n\n対応する 4 ドメインは、現代社会でセルフマネジメントを阻害する 4 つの原因 — アテンションエコノミー・意志力信奉・AI による専門性民主化・コミュニケーション希釈化 — に対応します。組織で発達してきた People Management の知見 (1on1 / フィードバック / 介入タイミング / バーンアウト回避) を個人に転写し、AI コンパニオンが日々のリフレクションを伴走します。\n\n「使わなくなっていくアプリが、いいアプリ。」卒業も、戻ってくるのも自由です。',
		type: 'app',
		status: 'development',
		platforms: ['ios'],
		links: {
			web: 'https://reinself.com'
		},
		technologies: ['Swift', 'SwiftUI', 'Foundation Models', 'AI', 'Firebase'],
		thumbnail: '/rein-icon.png',
		featured: true,
		price: '無料（プレミアム予定）',
		category: 'ヘルスケア/フィットネス',
		ageRating: '4+',
		features: [
			'4 ドメイン統合ログ（ダイエット・運動・コミュニケーション・デジタル習慣）',
			'衝動・停滞を「自分を知るサイン」として扱う非対決型の介入設計',
			'失敗を「次の一歩を選ぶ手がかり」として扱う Reflection ループ',
			'People Management の知見を個人に転写した AI コンパニオン',
			'長期方向を保つ Aspiration Engine（なりたい自分を育て続ける）',
			'Ambient UX（疲れた日に開かなくても価値提供）',
			'卒業可能な設計（Graduation Design 3-Mode）',
			'観察 > 処方 / そっと差し出すエディトリアル原則',
			'Web メディア reinself.com との連携'
		]
	},
	{
		id: 'rein-web',
		name: 'Rein (Web)',
		description:
			'Rein iOS アプリと並走する Editorial メディア。セルフマネジメントを阻害する社会的原因を観察し、押し付けではなく「そっと差し出す」エッセイと診断体験を公開する。アプリと独立した surface として単独で価値が成立するように設計されている。',
		fullDescription:
			'reinself.com は、Rein のミッション「セルフマネジメントを阻害する原因を、ソフトウェアで取り除く / 回避する」を Editorial で実装するメディアです。\n\n「観察 > 処方」「そっと差し出す」をエディトリアル原則として、現代社会でセルフマネジメントを阻害する 4 つの原因 — アテンションエコノミー・意志力信奉・AI による専門性民主化・コミュニケーション希釈化 — に対する観察と問いを Killer Essay 形式で公開しています。\n\nアプリの広告塔ではなく、Web 単独で収益事業として成立するように設計された独立 surface です。Astro 5 + Cloudflare Pages の SSG 配信、Admin/CMS による継続更新、診断体験 (Stripe one-time) と連携して、自分の状態を観察する入り口を提供します。',
		type: 'web',
		status: 'production',
		platforms: ['web'],
		links: {
			web: 'https://reinself.com'
		},
		technologies: ['Astro', 'TypeScript', 'Cloudflare Pages', 'MDX'],
		thumbnail: '/rein-icon.png',
		featured: true,
		category: 'Editorial / メディア',
		features: [
			'観察 > 処方の Killer Essay（セルフマネジメントを阻害する 4 原因への観察）',
			'押し付けない / そっと差し出すエディトリアル原則（Rein Commandments 直結）',
			'診断体験 (Stripe one-time) との連携',
			'iOS アプリと独立した surface（Web 単独で価値が成立）',
			'Astro 5 SSG + Cloudflare Pages',
			'Admin/CMS による継続更新'
		]
	}
];

export const featuredProducts = products.filter((p) => p.featured);
