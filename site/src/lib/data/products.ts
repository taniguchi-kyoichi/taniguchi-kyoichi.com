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
		thumbnail: '/reading-memory-icon.webp',
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
		privacy: {
			effectiveDate: '2026-10-28',
			dataCollection: 'standard',
			dataItems: [
				'アカウントを識別するための ID（Apple または Google のサインイン）',
				'登録した本と、読書の記録',
				'本について書いたメモと、AI とのやりとり',
				'ニックネームとプロフィール画像',
				'読書の目標と、達成の記録',
				'アプリ内の操作の記録（改善のために使います）'
			],
			thirdPartyServices: [
				'Cloudflare（本・記録・メモの保管、課金までの流れの計測。計測はアプリを入れた端末ごとのIDで行い、アカウントのIDは送りません）',
				'Google（サインイン、利用状況の分析。1.4.0以前の版のアプリのデータの保管）',
				'Apple（サインイン）',
				'Google Gemini（本についてのAIとの対話と要約）',
				'RevenueCat（サブスクリプションの管理）',
				'楽天ブックス・Googleブックス・openBD・Open Library（本を探すときに、書名やISBNを送ります）'
			],
			analyticsUsed: true,
			contactEmail: 'info@taniguchi-kyoichi.com'
		},
		support: {
			contactEmail: 'info@taniguchi-kyoichi.com',
			faq: [
				{
					question: 'データはどこに保存されますか？',
					answer:
						'読書記録やメモはサーバーに保存され、お使いの端末のあいだで同期されます。サインインすれば、どの端末からでも同じ記録に戻れます。'
				},
				{
					question: 'インターネット接続は必要ですか？',
					answer: 'はい、ログインやデータの同期にインターネット接続が必要です。オフライン時もキャッシュされたデータの閲覧は可能ですが、新規登録や編集にはオンライン環境が必要です。'
				},
				{
					question: 'アカウントやデータを削除するには？',
					answer: 'プロフィール画面の「アカウントを削除」からアカウントと全データを完全に削除できます。この操作は取り消せません。'
				},
				{
					question: '無料とメモリープラスの違いは？',
					answer:
						'無料では、本を合計10冊まで登録できます（バーコードでの登録もこの10冊に含まれます）。メモ、前のメモの振り返り（手紙）、本棚、「今日読んだ」の記録、バッジ、基本の統計も無料です。AIの聞き手も1回だけ無料で試せます。メモリープラス（年額¥6,000／月額¥600）では、本の登録が無制限になり、AIの聞き手（書いたメモにAIが問いを返します）、AI要約、詳しい統計（ジャンル・気分・読書カレンダー）、年間の振り返り（Year in Books）が使えます。年額は、はじめの1か月を無料で試せます。'
				}
			],
			systemRequirements: 'iOS 17.0以上'
		},
		subscription: {
			planName: 'メモリープラス',
			prices: [
				{ period: '年額', price: '¥6,000' },
				{ period: '月額', price: '¥600' }
			],
			free: [
				'本の登録（合計10冊まで。バーコードでの登録もこの10冊に含まれます）',
				'メモと、前のメモの振り返り（手紙）',
				'本棚と、「今日読んだ」の記録',
				'AIの聞き手を1回だけ試せる',
				'バッジ',
				'基本の統計'
			],
			paid: [
				'本の登録が無制限',
				'AIの聞き手（書いたメモにAIが問いを返す・AI対話メモ）',
				'AI要約',
				'詳しい統計（ジャンル・気分・読書カレンダー）',
				'年間の振り返り（Year in Books）'
			],
			trial: { length: 1, unit: 'month', period: '年額', periodEn: 'annual' },
			restoreSteps: [
				'「プロフィール」タブを開く',
				'「プレミアムプランにアップグレード」を押す',
				'「購入を復元」を押す'
			],
			restoreStepsEn: [
				'Open the 「プロフィール」 (Profile) tab',
				'Tap 「プレミアムプランにアップグレード」 (Upgrade to Premium Plan)',
				'Tap 「購入を復元」 (Restore purchases)'
			]
		},
		en: {
			name: 'Reading Memory',
			privacy: {
				dataItems: [
					'An ID to identify your account (Sign in with Apple or Google)',
					'The books you add, and your reading records',
					'The notes you write about books, and your exchanges with AI',
					'Nickname and profile photo',
					'Reading goals, and records of reaching them',
					'Records of actions in the app (used to improve the app)'
				],
				thirdPartyServices: [
					'Cloudflare (storage of books, records and notes, and measuring the steps up to a purchase. This measurement uses an ID for each device the app is installed on, and does not send your account ID)',
					'Google (sign-in and usage analytics; storage of data for app versions 1.4.0 and earlier)',
					'Apple (sign-in)',
					'Google Gemini (conversations with AI about books, and summaries)',
					'RevenueCat (subscription management)',
					'Rakuten Books, Google Books, openBD and Open Library (when you search for a book, the title or ISBN is sent)'
				]
			},
			support: {
				faq: [
					{
						question: 'Where is my data stored?',
						answer:
							'Your reading records and notes are stored on the server and synced between your devices. When you sign in, you can get back to the same records from any device.'
					},
					{
						question: 'Do I need an internet connection?',
						answer:
							'Yes, you need an internet connection to sign in and to sync your data. While offline you can still view cached data, but adding or editing requires an online connection.'
					},
					{
						question: 'How do I delete my account and data?',
						answer:
							'You can permanently delete your account and all of your data from "Delete Account" on the profile screen. This cannot be undone.'
					},
					{
						question: 'What is the difference between free and Memory Plus?',
						answer:
							'For free, you can add up to 10 books in total (books added by barcode count toward these 10). Notes, looking back on earlier notes (letters), My Library, "Read today" records, badges and basic statistics are also free. You can also try the AI listener once for free. With Memory Plus (¥6,000 per year / ¥600 per month), you can add unlimited books and use the AI listener (AI answers your notes with questions), AI summary, detailed statistics (genres, moods and a reading calendar) and Year in Books. The annual plan is free to try for the first month.'
					}
				],
				systemRequirements: 'iOS 17.0 or later'
			},
			subscription: {
				planName: 'Memory Plus',
				prices: [
					{ period: 'Yearly', price: '¥6,000' },
					{ period: 'Monthly', price: '¥600' }
				],
				free: [
					'Adding books (up to 10 books in total; books added by barcode count toward these 10)',
					'Notes, and looking back on earlier notes (letters)',
					'My Library, and "Read today" records',
					'Try the AI listener once',
					'Badges',
					'Basic statistics'
				],
				paid: [
					'Unlimited books',
					'AI listener (AI answers your notes with questions; AI chat notes)',
					'AI summary',
					'Detailed statistics (genres, moods and a reading calendar)',
					'Year in Books'
				],
				restoreSteps: ['Open the "Profile" tab', 'Tap "Upgrade to Premium Plan"', 'Tap "Restore purchases"']
			}
		}
	},
	{
		id: 'gohobi-shukan',
		name: 'ごほうび習慣',
		description:
			'毎日の習慣が、ごほうびを取りに行くゲームになる。達成するたびにほしいものが近づき、届いたら自分にごほうびを。広告のない習慣化アプリ。',
		fullDescription:
			'ごほうび習慣は、続けたい習慣に「ごほうび」をひもづけて、ゲームのように続けるためのアプリです。運動・勉強・早起きなど、続けたいことを決めて1回ぶんの値を決めると、達成するたびにほしいものが近づいていきます。\n\nごほうびに届いたら、がんばった自分にごほうびを。数字はアプリの中だけのもので、現金やポイントにはなりません。続けるほど増える継続ボーナス、時間で進めるタイマー、毎日のリマインダーで、気持ちが切れにくくなります。\n\n3.0 で SwiftUI で作り直し、広告をやめました。記録はこの端末に保存され、匿名のアカウントでバックアップされます。Premium で Apple または Google とつなぐと、複数の端末で同期でき、機種を変えても続きから使えます。',
		type: 'app',
		status: 'production',
		platforms: ['ios'],
		links: {
			appStore: 'https://apps.apple.com/jp/app/id1671700938'
		},
		technologies: ['Swift', 'SwiftUI', 'Cloudflare Workers', 'D1', 'Firebase'],
		thumbnail: '/gohobi-shukan-icon.png',
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
		privacy: {
			effectiveDate: '2026-10-29',
			dataCollection: 'standard',
			dataItems: [
				'アカウントを識別するためのID（初めて開いたときに作られる匿名のID。AppleまたはGoogleとつないだときは、そのアカウントのID）',
				'メールアドレス（AppleまたはGoogleとつないだときだけ。サインインのために使います）',
				'登録した習慣・ごほうび・目標と、達成や交換の記録（バックアップと同期のため）',
				'アプリ内の操作の記録（アプリを開いた・習慣を達成した・Premiumの画面を見た、など）と、アプリの版、端末の言語と地域。習慣やごほうびの名前、金額、入力した文は含みません',
				'購入の記録（無料体験の開始・購入・更新・解約・返金と、その金額と通貨。以前の「広告削除」を含みます）と、Appleの検索広告からアプリを入れたかどうか',
				'通知のための端末の情報（プッシュ通知のトークン、時間帯、言語、アプリの版、通知を許可しているかどうか）'
			],
			thirdPartyServices: [
				'Google Firebase Authentication（アカウントのIDの発行とサインイン。Googleでのサインインを含みます）',
				'Apple（Appleでのサインイン、プッシュ通知の配信、App Storeでの支払い）',
				'Cloudflare（記録のバックアップと同期、操作の記録・購入の記録・通知の端末の情報の保管、通知の送信）',
				'RevenueCat（サブスクリプションの管理、Appleの検索広告からアプリを入れたかどうかの計測）'
			],
			analyticsUsed: true,
			sections: [
				{
					title: '運営者',
					paragraphs: [
						'ごほうび習慣は、日本に住む個人開発者の谷口恭一が運営しています。EU一般データ保護規則（GDPR）などでいう、データの管理者にあたります。連絡先はこのページの最後にあります。'
					]
				},
				{
					title: '使う目的と法的根拠',
					paragraphs: [
						'集めた情報は次の目的にだけ使います。広告には使いません。情報を売ることも、ほかの会社のアプリやWebサイトをまたいで追跡することもしません。目的ごとに「:」の後ろに書いたのが、EU・英国などにお住まいの方についてのGDPRの法的根拠です。'
					],
					items: [
						'アプリを提供するため（サインイン、記録のバックアップと同期、Premium、許可された通知の配信）: 利用者との契約の履行（GDPR第6条1項(b)）',
						'アプリの使われ方を知って改善するため、どこからアプリを入れて購入に至ったかを測るため: 私たちの正当な利益（同項(f)）。記録の中身を含まない、利用者への影響が小さい情報に絞っています'
					]
				},
				{
					title: '預け先とEUの外への移転',
					paragraphs: [
						'私たちは日本にいて、情報の保管と処理を上の「第三者サービス」の各社（Google・Apple・Cloudflare・RevenueCat）に任せています。各社のサーバーは米国や日本など、EUの外にあります。',
						'日本はEUから十分な保護の水準があると認められています（十分性認定）。米国などへの移転は、各社が用意するEUの標準契約条項（SCC）や、EU・米国データプライバシーフレームワークなどの仕組みで保護されます。'
					]
				},
				{
					title: '保存する期間',
					items: [
						'アカウントと、習慣・ごほうび・目標・達成と交換の記録: アカウントがあるあいだ。アカウントを削除すると消します',
						'操作の記録と購入の記録: アプリの改善と売上の把握に要るあいだ。アカウントを削除したあとは、あなたのIDを無作為なIDに置き換え、あなたと結びつかない形で残します',
						'通知の端末の情報: サインアウトしたとき、アカウントを削除したとき、Appleがその端末にもう届かないと答えたときに消します',
						'RevenueCatとAppleが持つ購入の記録は、各社の決まりに従って保管されます'
					]
				},
				{
					title: 'アカウントの削除',
					paragraphs: [
						'アプリの「設定」→「アカウントを削除」で、いつでもアカウントを削除できます。サインインのアカウントと、サーバーとこの端末にある習慣・ごほうび・目標・達成と交換の記録、通知の端末の情報が消えます。元に戻せません。',
						'操作の記録と購入の記録は、あなたのIDを無作為なIDに置き換えて残します。これらに習慣やごほうびの名前、金額、入力した文は含まれません。',
						'アカウントを削除してもPremiumは解約されず、Appleからの請求が続きます。先にApp Storeで解約してください。アプリを消すだけでは、サーバーの記録は消えません。'
					]
				},
				{
					title: '開示・削除などの求め方',
					paragraphs: [
						'自分の情報の開示・訂正・削除・利用の制限・利用への異議・データの持ち出しを求めることができます。下のメールアドレスにご連絡ください。原則として1か月以内にお答えします。本人の確認のため、いくつかお尋ねすることがあります。',
						'EU・英国などにお住まいの方は、お住まいの国のデータ保護の監督機関に苦情を申し立てることもできます。'
					]
				}
			],
			contactEmail: 'info@taniguchi-kyoichi.com'
		},
		support: {
			contactEmail: 'info@taniguchi-kyoichi.com',
			faq: [
				{
					question: 'ごほうびはどうやって近づきますか？',
					answer:
						'続けたい習慣を登録して1回ぶんの値を決めると、その習慣を達成するたびにごほうびが近づきます。続けるほど増える継続ボーナスもあります。'
				},
				{
					question: 'アプリの中の数字は現実のお金ですか？',
					answer:
						'いいえ。アプリの中だけの数字で、現金やポイントとして引き出すことはできません。自分で決めた「ごほうび」と交換して、続ける気持ちに使います。'
				},
				{
					question: 'データはどこに保存されますか？',
					answer:
						'この端末に保存され、匿名のアカウントでサーバーにもバックアップされます（無料）。Premium で Apple または Google とつなぐと、複数の端末で同期でき、機種を変えても引き継げます。'
				},
				{
					question: '機種変更してもデータを引き継げますか？',
					answer:
						'Premium で Apple または Google とつないでおくと引き継げます。新しい端末では、同じ Apple ID で購入を復元してから、同じアカウントでつないでください。'
				},
				{
					question: '以前に「広告削除」を買いました',
					answer:
						'3.0 から広告は無くなりました。以前に「広告削除」を買った方は、そのまま Premium を使えます。新しい端末では「購入を復元」を押してください。'
				},
				{
					question: 'リマインダーの通知が届きません',
					answer:
						'iOS の「設定」→「通知」→「ごほうび習慣」で通知が許可されているか確かめてください。習慣ごとの通知は、習慣の編集画面から曜日と時刻を決められます。'
				}
			],
			systemRequirements: 'iOS 17.0以上'
		},
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
			],
			trial: { length: 7, unit: 'day', period: '年額', periodEn: 'annual' },
			restoreSteps: ['「設定」を開く', '「購入を復元」を押す'],
			restoreStepsEn: ['Open 「設定」 (Settings) in the app', 'Tap 「購入を復元」 (Restore purchases)'],
			notes: [
				'2026年10月26日までに使い始めた方は、追加の支払いなしで Premium を使えます',
				'以前に買い切りの「広告削除」を買った方は、追加の支払いなしで Premium を使えます'
			]
		},
		en: {
			name: 'Reward Habits',
			privacy: {
				dataItems: [
					'An ID to identify your account (an anonymous ID created when you first open the app; when you connect Apple or Google, the ID of that account)',
					'Email address (only when you connect Apple or Google; used for sign-in)',
					'The habits, rewards and goals you add, and records of completions and exchanges (to back them up and sync them)',
					'Records of actions in the app (such as opening the app, completing a habit, or viewing the Premium screen), with the app version and the language and region of your device. They do not contain the names of your habits or rewards, amounts, or text you type',
					'Purchase records (start of a free trial, purchases, renewals, cancellations and refunds, with the amount and currency; including the earlier "Remove Ads"), and whether the app was installed from Apple Search Ads',
					'Device information for notifications (the push notification token, time zone, language, app version, and whether notifications are allowed)'
				],
				thirdPartyServices: [
					'Google Firebase Authentication (issuing the account ID and sign-in, including sign-in with Google)',
					'Apple (Sign in with Apple, delivery of push notifications, and payment on the App Store)',
					'Cloudflare (backup and sync of records; storage of action records, purchase records and device information for notifications; sending notifications)',
					'RevenueCat (subscription management, and measuring whether the app was installed from Apple Search Ads)'
				],
				sections: [
					{
						title: 'Who we are',
						paragraphs: [
							'Reward Habits is run by Kyoichi Taniguchi, an individual developer based in Japan, who is the controller of your data under the EU General Data Protection Regulation (GDPR) and similar laws. Contact details are at the end of this page.'
						]
					},
					{
						title: 'Why we use your information, and our legal bases',
						paragraphs: [
							'We use the information only for the purposes below. We do not use it for advertising, we do not sell it, and we do not track you across other companies\' apps or websites. The text after each purpose is the GDPR legal basis for people in the EU, the UK and similar regions.'
						],
						items: [
							'To provide the app (sign-in, backup and sync of your records, Premium, and the notifications you allow): performance of our contract with you (GDPR Article 6(1)(b))',
							'To understand how the app is used and improve it, and to measure where installs and purchases come from: our legitimate interests (Article 6(1)(f)). We limit this to information that does not include the content of your records and has little impact on you'
						]
					},
					{
						title: 'Service providers and transfers outside the EU',
						paragraphs: [
							'We are based in Japan, and we use the companies listed under "Third-party services" above (Google, Apple, Cloudflare and RevenueCat) to store and process the information. Their servers are outside the EU, including in the United States and Japan.',
							'The EU recognizes Japan as providing an adequate level of protection (an adequacy decision). Transfers to the United States and other countries are protected by the safeguards each provider offers, such as the EU Standard Contractual Clauses (SCCs) or the EU-U.S. Data Privacy Framework.'
						]
					},
					{
						title: 'How long we keep it',
						items: [
							'Your account and your habits, rewards, goals, and completion and exchange records: while you have an account. They are deleted when you delete your account',
							'Action records and purchase records: as long as needed to improve the app and understand revenue. After you delete your account, we replace your ID with a random ID and keep them in a form that is no longer linked to you',
							'Device information for notifications: deleted when you sign out, when you delete your account, or when Apple reports that the device can no longer be reached',
							'Purchase records held by RevenueCat and Apple are kept under each company\'s own rules'
						]
					},
					{
						title: 'Deleting your account',
						paragraphs: [
							'You can delete your account at any time in the app under Settings → Delete Account (「設定」→「アカウントを削除」 in Japanese). This deletes your sign-in account; your habits, rewards, goals, and completion and exchange records on the server and on this device; and the device information for notifications. It cannot be undone.',
							'Action records and purchase records are kept with your ID replaced by a random ID. They do not contain the names of your habits or rewards, amounts, or text you type.',
							'Deleting your account does not cancel Premium, and Apple will keep billing you. Cancel it in the App Store first. Deleting the app alone does not delete your records on the server.'
						]
					},
					{
						title: 'Requesting access, deletion and more',
						paragraphs: [
							'You can ask us to give you access to, correct, or delete your information, to restrict or stop using it, or to give you a copy to take elsewhere. Email us at the address below. We will normally reply within one month. We may ask you a few questions to confirm that the account is yours.',
							'If you live in the EU, the UK or a similar region, you can also complain to the data protection authority in your country.'
						]
					}
				]
			},
			support: {
				faq: [
					{
						question: 'How does a reward get closer?',
						answer:
							'Add a habit you want to keep and set the value of one completion. Each time you complete that habit, your reward gets closer. There is also a streak bonus that grows the longer you keep going.'
					},
					{
						question: 'Are the numbers in the app real money?',
						answer:
							'No. The numbers exist only inside the app and cannot be withdrawn as cash or points. You exchange them for "rewards" you choose yourself, to help you keep going.'
					},
					{
						question: 'Where is my data stored?',
						answer:
							'It is stored on this device and also backed up to the server with an anonymous account (free). With Premium, you can connect Apple or Google to sync across multiple devices and carry your data over when you change phones.'
					},
					{
						question: 'Can I keep my data when I change phones?',
						answer:
							'Yes, if you connect Apple or Google with Premium. On the new device, restore your purchase with the same Apple ID, then connect the same account.'
					},
					{
						question: 'I bought "Remove Ads" before',
						answer:
							'Ads were removed in 3.0. If you bought "Remove Ads" before, you can keep using Premium as is. On a new device, tap "Restore purchases".'
					},
					{
						question: 'Reminder notifications do not arrive',
						answer:
							'In iOS Settings → Notifications → Reward Habits, check that notifications are allowed. For each habit, you can set the days and time of its notification on the habit\'s edit screen.'
					}
				],
				systemRequirements: 'iOS 17.0 or later'
			},
			subscription: {
				planName: 'Premium',
				prices: [
					{ period: 'Yearly', price: '¥6,000' },
					{ period: 'Monthly', price: '¥800' }
				],
				free: [
					'Up to 3 habits, and any number of rewards',
					'Completions and exchanges, and the streak bonus',
					'Timer and reminders',
					'History charts for the last 7 days',
					'Cloud backup of your records (anonymous account)'
				],
				paid: [
					'Any number of habits',
					'Home Screen widget',
					'History charts for all time',
					'Connect Apple or Google to sync across multiple devices',
					'Continue where you left off after changing phones'
				],
				restoreSteps: ['Open "Settings"', 'Tap "Restore purchases"'],
				notes: [
					'If you started using the app on or before October 26, 2026, you can use Premium at no additional cost',
					'If you bought the earlier one-time "Remove Ads" purchase, you can use Premium at no additional cost'
				]
			}
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
		thumbnail: '/rein-icon.webp',
		ogImage: '/rein-icon.png',
		featured: true,
		hidden: true,
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
		technologies: ['Swift', 'SwiftUI', 'Cloudflare Workers', 'D1', 'Firebase'],
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
		privacy: {
			// 本文を実態に合わせて書き直した日。**中身を直したらここも直す** ——
			// 表示だけ古い日付が残ると、法務ページがそのページ自身の内容と食い違う。
			effectiveDate: '2026-10-26',
			dataCollection: 'minimal',
			dataItems: [
				'アカウントを識別するための ID（端末内で作られる匿名の ID、または Apple・Google のサインイン）',
				'表示名（「あなた／パートナー」の区別に使うニックネーム。本名は保存しません）',
				'登録した日用品と、買った記録',
				'ご自身で撮影した写真（アイテムや世帯のアイコン）',
				'レシートの写真（読み取りのために送信し、読み取った後は保存しません）',
				'世帯に招待するためのコード（そのままではなく、元に戻せない形にして保存します）',
				'通知を届けるための端末の識別子',
				'ストックレーダー プラスの加入状況',
				'その月に読み取ったレシートの枚数（無料の枚数を数えるため）',
				'アプリ内の操作の記録（改善のために使います。広告には使いません）'
			],
			thirdPartyServices: [
				'Google（サインイン、利用状況の分析、レシートと商品名の読み取り）',
				'Yahoo! JAPAN（バーコードから商品名を調べるときに、バーコードの番号を送ります）',
				'Apple（サインイン、通知の配信）',
				'Cloudflare（データと写真の保管、世帯のあいだの同期）',
				'RevenueCat（サブスクリプションの管理）'
			],
			analyticsUsed: true,
			contactEmail: 'info@taniguchi-kyoichi.com'
		},
		support: {
			contactEmail: 'info@taniguchi-kyoichi.com',
			faq: [
				{
					question: '無料でどこまで使えますか？',
					answer:
						'日用品の登録・切れかけの予測・1タップの記録・通知・ウィジェット・買い物前のチェックは無料です。レシートの読み取りは、月3枚まで無料です（日本時間の月の初めに戻ります）。4枚目からの読み取りと、家族との共有は「ストックレーダー プラス」で使えます。'
				},
				{
					question: 'ストックレーダー プラスとは？',
					answer:
						'レシートの読み取りが無制限になり、同じ家の在庫を家族と1つのリストで共有できる有料プランです。年額¥6,000（7日間の無料お試しつき）/ 月額¥800 で、自動で更新されます。世帯の誰か1人が入れば、世帯のみんなで共有できます。'
				},
				{
					question: 'データはどこに保存されますか？',
					answer:
						'在庫や購入の記録はサーバーに保存され、世帯のメンバーのあいだで同期されます。氏名やメールアドレスは保存しません（メンバーは「あなた／パートナー」として扱います）。'
				},
				{
					question: 'アカウントやデータを削除するには？',
					answer:
						'アカウント画面の「アカウントを削除」から、世帯データを含めて完全に削除できます。この操作は取り消せません。'
				}
			],
			systemRequirements: 'iOS 26.0以上'
		},
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
			trial: { length: 7, unit: 'day', period: '年額', periodEn: 'annual' },
			restoreSteps: ['「設定」を開く', '「アカウント」を押す', '「購入を復元」を押す'],
			restoreStepsEn: [
				'Open 「設定」 (Settings) in the app',
				'Tap 「アカウント」 (Account)',
				'Tap 「購入を復元」 (Restore purchases)'
			]
		}
	},
	{
		id: 'jibun-bgm',
		name: 'じぶんBGM',
		description:
			'作業中も、生活の中でも、BGMを流しっぱなしに。定番のBGMは押せばすぐ鳴り、曲と環境音を重ねて自分のBGMとして残せる iOS アプリ。',
		fullDescription:
			'じぶんBGMは、作業中も生活の中でも、音を止めずに流しておくためのアプリです。朝のカフェミュージックや夜のジャズバーなど、定番のBGMは押せばすぐに鳴ります。\n\n曲に雨や焚き火、波の音を重ねて音量を決めれば、自分のBGMとして保存できます。集中するときは長さを決めてタイマーを動かすと、音が鳴っている時間だけを数えます。\n\nロック画面とコントロールセンターから、アプリを開かずにいつものBGMを流せます。音はオフラインでも鳴り続けます。広告はなく、再生時間の制限もありません。',
		type: 'app',
		status: 'development',
		platforms: ['ios'],
		links: {},
		technologies: ['Swift', 'SwiftUI', 'AVAudioEngine', 'Cloudflare Workers', 'D1', 'R2', 'Firebase'],
		thumbnail: '/jibun-bgm-icon.png',
		ogImage: '/jibun-bgm-icon.jpg',
		featured: true,
		price: '無料（プレミアムあり）',
		category: 'ミュージック',
		ageRating: '4+',
		features: [
			'定番のBGMは押せばすぐに鳴る',
			'曲と環境音を重ねて、自分のBGMとして保存（プレミアム）',
			'鳴っている時間だけを数える集中タイマー',
			'ロック画面・コントロールセンター・ウィジェットから流せる',
			'オフラインでも鳴り続ける',
			'広告なし・再生時間の制限なし'
		],
		privacy: {
			effectiveDate: '2026-10-26',
			dataCollection: 'minimal',
			dataItems: [
				'匿名のインストール ID（初回の起動で端末が作るランダムな文字列。アカウントとは結び付けません）',
				'アプリ内の操作の記録（例: 画面を開いた、BGMを流した。値は数の範囲や決まった語だけで、BGMの名前や入力した文字は送りません）',
				'サインインしたときだけ: メールアドレスとユーザー ID（有料プランを別の端末に引き継ぐためだけに使います）',
				'有料プランの期限（サインインしているときはユーザー ID と一緒に）',
				'音の配信のときに、接続元の IP アドレス（配信と不正利用の防止のため）',
				'作ったBGM・お気に入り・集中の記録・外観の設定は端末の中だけに保存し、送りません',
				'広告 ID（IDFA）は読みません。広告もトラッキングもありません'
			],
			thirdPartyServices: [
				'Google Firebase Authentication（Apple または Google でサインインしたときだけ）',
				'Apple（サインイン）',
				'Cloudflare（音とカタログの配信、操作の記録の保管）',
				'RevenueCat（サブスクリプションの管理）'
			],
			analyticsUsed: true,
			contactEmail: 'info@taniguchi-kyoichi.com'
		},
		support: {
			contactEmail: 'info@taniguchi-kyoichi.com',
			faq: [
				{
					question: '無料でどこまで使えますか？',
					answer:
						'定番のBGMを流す・タイマー・ロック画面とコントロールセンターからの操作は無料です。曲と環境音を重ねて自分のBGMを保存すること、ウィジェットで流すBGMを選ぶことはプレミアム（年額¥6,000 / 月額¥1,200）です。'
				},
				{
					question: 'インターネットにつながっていなくても鳴りますか？',
					answer: '一度読み込んだ音は、オフラインでも鳴り続けます。'
				},
				{
					question: 'サインインは必要ですか？',
					answer:
						'いいえ。サインインしなくても、すべての機能を使えます。サインインが要るのは、有料プランを別の端末に引き継ぐときだけです。'
				},
				{
					question: 'アカウントを削除するには？',
					answer:
						'BGMの一覧の右上の人のアイコンから「アカウント」を開き、「アカウントを削除」を押してください。端末に保存したBGMは端末に残ります。'
				}
			],
			systemRequirements: 'iOS 27.0以上'
		},
		subscription: {
			planName: 'プレミアム',
			prices: [
				{ period: '年額', price: '¥6,000' },
				{ period: '月額', price: '¥1,200' }
			],
			free: [
				'定番のBGMを流す',
				'集中タイマー',
				'ロック画面・コントロールセンターからの操作',
				'広告なし・再生時間の制限なし'
			],
			paid: ['曲と環境音を重ねて、自分のBGMとして保存', 'ウィジェットで流すBGMを選ぶ'],
			restoreSteps: [
				'BGMの一覧の右上の人のアイコンから「アカウント」を開く',
				'「プラン」の「有料にする」を押す',
				'「購入を復元」を押す'
			],
			restoreStepsEn: [
				'On the BGM list, tap the person icon at the top right to open 「アカウント」 (Account)',
				'Under 「プラン」 (Plan), tap 「有料にする」 (Upgrade)',
				'Tap 「購入を復元」 (Restore purchases)'
			]
		}
	}
];

/** 通常の Products 一覧に出す（非表示・build in public を除く） */
export const visibleProducts = products.filter((p) => !p.hidden && !p.buildInPublic);
/** build in public 専用セクションに出す */
export const buildingInPublic = products.filter((p) => !p.hidden && p.buildInPublic);
