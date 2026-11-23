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
		platforms: ['ios', 'android'],
		links: {
			appStore: 'https://apps.apple.com/jp/app/id6751159926',
			googlePlay: 'https://play.google.com/store/apps/details?id=com.kyoichi.readingmemory'
		},
		thumbnail: '/reading-memory-icon.webp',
		showcase: {
			catch: '読書が、毎日の習慣になる',
			lead: '読んだ本と書いた言葉を、1冊ずつ本棚に並べていく読書記録のアプリです。',
			scenes: [
				{
					title: '寝る前の10分が、読書の時間になる',
					body: '決めた時間にそっと知らせが届きます。読んだ日には印が付き、続いた日が目に見えて増えていきます。'
				},
				{
					title: '前に読んだ本の言葉を、また思い出せる',
					body: '心に残った一文を書いておくと、あとで見返せます。読み終えた本が、ちゃんと自分の中に残ります。'
				},
				{
					title: '積んだままの本が、本棚で待っている',
					body: '読みたい本も読み終えた本も同じ本棚に。次に読む1冊がすぐに決まります。'
				}
			],
			closing: '今夜の1冊から、はじめてみませんか。',
			screenshots: [
				{ src: '/products/reading-memory/1.webp', alt: '読書が、毎日の習慣に。読んだ日に印が並んだカレンダーの絵' },
				{ src: '/products/reading-memory/2.webp', alt: '読むほど、続けたくなる。読んだ日数と連続日数、月のカレンダーの画面' },
				{ src: '/products/reading-memory/3.webp', alt: '前に読んだ本を、もう忘れない。読んでいる本と、前に書いたメモが出る本棚の画面' },
				{ src: '/products/reading-memory/4.webp', alt: '積読が、なくなっていく。読み終えた本とこれから読む本が並ぶ本棚の画面' }
			],
			theme: { bg: '#f5ede1', fg: '#3a2a22', accent: '#a6452f', muted: '#7a6658' }
		},
		ogImage: '/reading-memory-icon.jpg',
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
		audience: '読んだことを残したい人。読んだ内容や感想を忘れてしまう人、本を買っては積んでしまう人、仕事や勉強で実用書を読む人に向けています。',
		why: '「読んだのに内容を話せない」「読み返しても前に何を思ったか分からない」をなくすため。読んだ本の要点と感想を自分の言葉で残し、あとで見返せるようにしました。',
		systemRequirements: 'iOS 26.0以上、Android 8.0以上',
		subscription: {
			planName: 'メモリープラス',
			prices: [
				{ period: '年額', price: '¥6,000' },
				{ period: '月額', price: '¥600' }
			],
			free: [
				'本の登録（冊数の上限はありません。タイトルの検索とバーコードの読み取り）',
				'付箋とノート、ページを撮って文字を読み取り、選んだ行をノートに足すこと',
				'読書カードとはんこ、年ごとのカード箱',
				'読んだ日のカレンダー、続けた日数、基本の統計、バッジ',
				'前に書いたメモの振り返り、ウィジェット',
				'ノートの言葉の索引（ほかの本は、冊数と1行目まで）'
			],
			paid: [
				'撮ったページの、選んだ行を要点に整える（AIを使います）',
				'ノートの言葉を、ほかの本からも引く索引（全部の行）',
				'1年のまとめ（その年に読んだ本と書いたことをまとめて見返す）',
				'詳しい統計（月ごとの読了数・ジャンル・評価・読後の気持ち）',
				'書いたメモの要約（AIを使います）'
			]
		},
		legal: {
			support: 'https://taniguchi-kyoichi.com/products/reading-memory/support',
			privacy: 'https://taniguchi-kyoichi.com/products/reading-memory/privacy',
			terms: 'https://taniguchi-kyoichi.com/products/reading-memory/terms',
			supportEn: 'https://taniguchi-kyoichi.com/en/products/reading-memory/support'
		},
		nameEn: 'Reading Memory'
	},
	{
		id: 'gohobi-shukan',
		name: 'ごほうび習慣',
		description:
			'毎日の習慣が、ごほうびを取りに行くゲームになる。達成するたびにほしいものが近づき、届いたら自分にごほうびを。広告のない習慣化アプリ。',
		fullDescription:
			'ごほうび習慣は、続けたい習慣に「ごほうび」をひもづけて、ゲームのように続けるためのアプリです。運動・勉強・早起きなど、続けたいことを決めて1回ぶんの値を決めると、達成するたびにほしいものが近づいていきます。\n\nごほうびに届いたら、がんばった自分にごほうびを。数字はアプリの中だけのもので、現金やポイントにはなりません。続けるほど増える継続ボーナス、時間で進めるタイマー、毎日のリマインダーで、気持ちが切れにくくなります。\n\n3.0 で作り直し、広告をやめました。記録はこの端末に保存され、匿名のアカウントでバックアップされます。Premium で Apple または Google とつなぐと、複数の端末で同期でき、機種を変えても続きから使えます。',
		type: 'app',
		status: 'production',
		platforms: ['ios', 'android'],
		links: {
			appStore: 'https://apps.apple.com/jp/app/id1671700938',
			googlePlay: 'https://play.google.com/store/apps/details?id=com.kyoichi.gohobishukan',
			web: 'https://gohobishukan.com'
		},
		thumbnail: '/gohobi-shukan-icon.webp',
		showcase: {
			catch: '続かなかったことが、自分へのごほうびで続く',
			lead: 'ケーキや旅行など、自分で決めたごほうびを目標に、習慣を続けるアプリです。',
			scenes: [
				{
					title: '間食をがまんした日が、ケーキに近づく',
					body: '手に入れたいごほうびを自分で決めます。今日の分を達成すると、ごほうびまでの残りが減っていきます。'
				},
				{
					title: 'がんばった分が、目に見えて進む',
					body: '続いた日と、ごほうびまでの進み具合がひと目で分かります。意志の力だけに頼らず、ゲームのように続けられます。'
				},
				{
					title: '届いたら、がんばった自分にごほうび',
					body: 'ごほうびに届いたら交換します。次のごほうびを決めて、また明日から。'
				}
			],
			closing: '続けたいことを、1つ決めてみませんか。',
			screenshots: [
				{ src: '/products/gohobi-shukan/1.webp', alt: '続かなかったことが、ごほうびで続く。間食をがまんしたらケーキ、早起きしたらカフェなど、習慣とごほうびの組み合わせの絵' },
				{ src: '/products/gohobi-shukan/2.webp', alt: '続けた分だけ、ほしいものが近づく。ごほうびまで習慣をあと2回と出るホームの画面' },
				{ src: '/products/gohobi-shukan/3.webp', alt: 'タップして、今日もクリア。ごほうびに届いて交換できるようになった画面' },
				{ src: '/products/gohobi-shukan/4.webp', alt: '届いたら、自分にごほうび。長押しでごほうびを開く画面' }
			],
			theme: { bg: '#1f4a3b', fg: '#fdf6e6', accent: '#f2c13d', muted: '#cfe0d6' }
		},
		ogImage: '/gohobi-shukan-icon.png',
		featured: true,
		rating: 4.7,
		ratingCount: 73,
		price: '無料（Premium あり）',
		category: 'ライフスタイル',
		ageRating: '4+',
		features: [
			'習慣を達成するたびに、ごほうびが近づく',
			'届いたら、自分へのごほうびと交換',
			'続けるほど増える継続ボーナス',
			'時間で進めるタイマーと、毎日のリマインダー',
			'広告なし',
			'Premium で Apple / Google とつないで、複数の端末で同期'
		],
		audience: 'ゲームのような手ごたえがあると続く大人（高校生〜30代）。勉強・運動・早起きを続けたいけれど、ただのチェックリストでは飽きてしまう人に向けています。',
		why: 'ただのチェックリストでは習慣が続かないため。続けるための仕組みをそのまま遊びにして、「今日の1回で、ごほうびが確かに近づいた」という嬉しさで続けられるようにしました。',
		systemRequirements: 'iOS 17.0以上、Android 8.0以上',
		subscription: {
			planName: 'Premium',
			prices: [
				{ period: '年額', price: '¥6,000' },
				{ period: '月額', price: '¥800' }
			],
			free: [
				'習慣は3つまで、ごほうびは上限なし',
				'達成と交換、継続ボーナス',
				'タイマーとリマインダー',
				'記録のグラフは直近の7日',
				'記録のクラウドバックアップ（匿名のアカウント）'
			],
			paid: [
				'習慣をいくつでも',
				'ホーム画面のウィジェット',
				'記録のグラフを全期間',
				'Apple または Google とつないで、複数の端末で同期',
				'機種を変えても続きから使える'
			]
		},
		legal: {
			support: 'https://gohobishukan.com/support/',
			privacy: 'https://gohobishukan.com/privacy/',
			terms: 'https://gohobishukan.com/terms/',
			supportEn: 'https://gohobishukan.com/en/support/'
		},
		nameEn: 'Reward Habits'
	},
	{
		id: 'stock-radar',
		name: 'ストックレーダー',
		description:
			'家の消耗品の「切れかけ」を予知して、買い忘れと二重買いをなくす。数えない・開かない・忘れても壊れない、家族で使える在庫管理アプリ。',
		fullDescription:
			'ストックレーダーは、トイレットペーパーや洗剤といった家の消耗品を切らさないためのアプリです。在庫を数えて記録するのではなく、「買った」を1タップ押すだけ。購入の間隔から、そろそろ切れそうなタイミングをそっと予知して教えます。\n\n通知とウィジェットで「今どれが切れかけか」がすぐわかるので、アプリを開く必要すらありません。買ってきたレシートを撮れば、買ったものをまとめて記録できます。買い物前チェックで、買うもの・買わなくていいもの（最近買ったもの）を分けて見られるので、二重買いも防げます。\n\n記録・予測・通知は無料です。レシートの読み取りは月3枚まで無料。読み取りを無制限にしたいときや、家族と同じ在庫リストを共有したいときは「ストックレーダー プラス」をどうぞ。氏名やメールアドレスは保存しません。アカウントの削除はアプリの中からいつでもでき、世帯のデータごと消えます。',
		type: 'app',
		status: 'production',
		platforms: ['ios'],
		// App Store のリンクは**公開を確かめてから**入れる（審査中に入れると 404 を晒す）。
		// 2026-08-21 に 1.0 が公開されたので入れた（iTunes Lookup で trackId を実測）。
		links: {
			appStore: 'https://apps.apple.com/jp/app/id6792582581',
			web: 'https://stock-radar.taniguchi-kyoichi.com'
		},
		// 掲載は3本（読書メモリー・ごほうび習慣・じぶんBGM）に絞った。規約・プライバシー・サポートのページは appgrowstack-legal の Worker が出す。
		hidden: true,
		thumbnail: '/stock-radar-icon.png',
		ogImage: '/stock-radar-icon.jpg',
		featured: true,
		releaseDate: '2026-08-21',
		version: '1.0',
		price: '無料（ストックレーダー プラスあり）',
		category: 'ライフスタイル',
		ageRating: '4+',
		features: [
			'「買った」1タップで、切れかけを自動予知',
			'通知とウィジェットで、開かずに把握',
			'買い物前チェックで二重買いを防止',
			'レシートを撮って、買ったものをまとめて記録（月3枚まで無料）',
			'ストックレーダー プラスで、家族と在庫を共有',
			'氏名・メール不要。アカウント削除はアプリ内から'
		],
		systemRequirements: 'iOS 26.0以上',
		subscription: {
			planName: 'ストックレーダー プラス',
			prices: [
				{ period: '年額', price: '¥6,000' },
				{ period: '月額', price: '¥800' }
			],
			free: [
				'日用品の登録・切れかけの予測・1タップの記録・通知・ウィジェット・買い物前のチェック',
				'レシートの読み取り（月3枚まで。日本時間の月の初めに戻ります）'
			],
			paid: [
				'レシートの読み取りが無制限',
				'家族と1つの在庫リストを共有（世帯の誰か1人が入れば、世帯のみんなで使えます）'
			],
			trial: { length: 7, unit: 'day', period: '年額' }
		},
		legal: {
			support: 'https://taniguchi-kyoichi.com/products/stock-radar/support',
			privacy: 'https://taniguchi-kyoichi.com/products/stock-radar/privacy',
			terms: 'https://taniguchi-kyoichi.com/products/stock-radar/terms'
		}
	},
	{
		id: 'jibun-bgm',
		name: 'じぶんBGM',
		description:
			'作業中も、生活の中でも、BGMを流しっぱなしに。定番のBGMはタップですぐ鳴り、曲と環境音を重ねて自分のBGMとして残せるアプリ。',
		fullDescription:
			'じぶんBGMは、作業中も生活の中でも、音を止めずに流しておくためのアプリです。朝のカフェミュージックや夜のジャズバーなど、定番のBGMはタップするとすぐに鳴ります。\n\n曲に雨や焚き火、波の音を重ねて音量を決めれば、自分のBGMとして保存できます。集中するときは長さを決めてタイマーを動かすと、音が鳴っている時間だけを数えます。\n\nロック画面とコントロールセンター（Androidはクイック設定）から、アプリを開かずにいつものBGMを流せます。音はオフラインでも鳴り続けます。広告はなく、再生時間の制限もありません。',
		type: 'app',
		status: 'production',
		platforms: ['ios', 'android'],
		links: {
			appStore: 'https://apps.apple.com/jp/app/id6816582916',
			googlePlay: 'https://play.google.com/store/apps/details?id=com.kyoichi.jibunbgm'
		},
		thumbnail: '/jibun-bgm-icon.webp',
		showcase: {
			catch: 'いつもの机が、朝のカフェになる',
			lead: 'ジャズやピアノに雨音やカフェのざわめきを重ねて、作業のあいだ流しておけるアプリです。',
			scenes: [
				{
					title: '好きな音を選ぶと、すぐに鳴りはじめる',
					body: '曲はジャズ・ピアノ・ボサノバ。環境音は雨・波・焚き火・カフェ。好きな物を重ねて、自分だけのBGMに。'
				},
				{
					title: '流したまま、作業に戻れる',
					body: '画面を消しても鳴り続けます。区切りの時間を決めておけば、集中と休けいの切り替えも任せられます。'
				},
				{
					title: 'その日の気分で、場所を変える',
					body: '雨の夜の窓辺、朝のカフェ、波の音の部屋。気分に合わせて、机の上の景色が変わります。'
				}
			],
			closing: '今日の作業に、音を1つ足してみませんか。',
			screenshots: [
				{ src: '/products/jibun-bgm/1.webp', alt: '好きな音を重ねて、自分の作業用BGMに。曲と雨や時計の音の音量を合わせる画面' },
				{ src: '/products/jibun-bgm/2.webp', alt: 'いつもの机が、雨の窓辺になる。雨の窓を背に再生しているロック画面' },
				{ src: '/products/jibun-bgm/3.webp', alt: 'その日の気分で、選んで流すだけ。雨の夜の窓辺や夕暮れの海辺など、場面ごとのBGMが並ぶ画面' },
				{ src: '/products/jibun-bgm/4.webp', alt: '答えるだけで、あなたのBGMができる。質問に答えてできたBGMの画面' }
			],
			theme: { bg: '#17150f', fg: '#f3ece0', accent: '#e7b46a', muted: '#b9ad9b' }
		},
		ogImage: '/jibun-bgm-icon.jpg',
		featured: true,
		price: '無料（プレミアムあり）',
		category: 'ミュージック',
		ageRating: '4+',
		features: [
			'定番のBGMはタップするとすぐに鳴る',
			'曲と環境音を重ねて、自分のBGMとして保存（プレミアム）',
			'鳴っている時間だけを数える集中タイマー',
			'ロック画面・コントロールセンター（Androidはクイック設定）・ウィジェットから流せる',
			'オフラインでも鳴り続ける',
			'広告なし・再生時間の制限なし'
		],
		audience: '音を流しながら作業や勉強をする人。雨や焚き火の音を重ねたい人、YouTubeのカフェジャズなどで作業している人に向けています。',
		why: 'YouTubeで毎回やっている「BGMを探して、音量を合わせて、広告で止まる」を省くため。曲に雨音や焚き火の音を自分の比率で重ねて保存し、押せばすぐ流れるようにしました。',
		systemRequirements: 'iOS 27.0以上、Android 8.0以上',
		subscription: {
			planName: 'プレミアム',
			prices: [
				{ period: '年額', price: '¥6,000' },
				{ period: '月額', price: '¥1,200' }
			],
			free: [
				'定番のBGMを流す',
				'集中タイマー',
				'ロック画面・コントロールセンター（Androidはクイック設定と通知）からの操作',
				'広告なし・再生時間の制限なし'
			],
			paid: ['曲と環境音を重ねて、自分のBGMとして保存', 'ウィジェットで流すBGMを選ぶ']
		},
		legal: {
			support: 'https://taniguchi-kyoichi.com/products/jibun-bgm/support',
			privacy: 'https://taniguchi-kyoichi.com/products/jibun-bgm/privacy',
			terms: 'https://taniguchi-kyoichi.com/products/jibun-bgm/terms',
			supportEn: 'https://taniguchi-kyoichi.com/en/products/jibun-bgm/support'
		},
		nameEn: 'Jibun BGM'
	}
];

/** 通常の Products 一覧に出す（非表示・build in public を除く） */
export const visibleProducts = products.filter((p) => !p.hidden && !p.buildInPublic);
/** build in public 専用セクションに出す */
export const buildingInPublic = products.filter((p) => !p.hidden && p.buildInPublic);
