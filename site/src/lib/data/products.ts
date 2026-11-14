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
		privacy: {
			effectiveDate: '2026-11-14',
			dataCollection: 'standard',
			dataItems: [
				'アカウントを識別するためのID（AppleまたはGoogleでのサインイン）。メールアドレスはサインインを任せている外部の事業者が持ち、読書の記録には保存しません',
				'登録した本と、読書の記録（読んだ日、読んだページ、評価、読後の気持ち、読書カード）',
				'本について書いた付箋・ノート・メモ（以前の版でAIが返した言葉も含みます）',
				'ページの写真（ページを撮って文字を読み取るときだけ。読み取りのあいだサーバーを通り、保存しません）',
				'ニックネームとプロフィール画像（iPhoneの版だけ）',
				'iPhoneの版では、アプリ内の操作の記録（アプリを開いた・本を探した・メモリープラスの画面を見た、など）と、アプリの版、端末の言語と地域',
				'Androidの版では、端末の中で文字とバーコードを読む機能の動作の記録（性能の数値・エラーの種類・端末の機種とOS・インストールごとのID）。その機能を提供する外部の事業者に送ります。読み取った文字や写真は含みません',
				'購入の記録（App StoreまたはGoogle Playでの購入・更新・解約）'
			],
			serviceProviders: [
				'サインイン・本と記録とメモとプロフィール画像の保管と同期・アプリの使われ方の分析・購入の管理・本を探すときの書名やISBNの照会・AIの機能を、外部の事業者に任せています。任せる情報は、その目的に要る分だけです。',
				'AIの機能では、ページを撮ったときに写真と端末が読み取った文字を送り、本文を文の単位に組み直すことと、選んだ行を要点に整えることに使います。本の要約を作るときは、その本について書いたメモを送ります。'
			],
			analyticsUsed: true,
			sections: [
				{
					title: '運営者',
					paragraphs: [
						'読書メモリーは、日本に住む個人開発者が運営しています。EU一般データ保護規則（GDPR）などでいう、データの管理者にあたります。連絡先はこのページの最後にあります。'
					]
				},
				{
					title: '使う目的と法的根拠',
					paragraphs: [
						'集めた情報は次の目的にだけ使います。広告には使いません。情報を売ることも、ほかの会社のアプリやWebサイトをまたいで追跡することもしません。書いたメモやページの写真をAIの学習のために渡すこともしません。目的ごとに「:」の後ろに書いたのが、EU・英国などにお住まいの方についてのGDPRの法的根拠です。'
					],
					items: [
						'アプリを提供するため（サインイン、本と記録とメモの保管と同期、ページの読み取り、要点と要約、メモリープラス）: 利用者との契約の履行（GDPR第6条1項(b)）',
						'アプリの使われ方を知って改善するため、どこからアプリを入れて購入に至ったかを測るため: 私たちの正当な利益（同項(f)）。書いたメモや本の中身を含まない、利用者への影響が小さい情報に絞っています'
					]
				},
				{
					title: '預け先とEUの外への移転',
					paragraphs: [
						'私たちは日本にいて、情報の保管と処理を外部の事業者に任せています。事業者のサーバーは米国や日本など、EUの外にあります。',
						'日本はEUから十分な保護の水準があると認められています（十分性認定）。米国などへの移転は、各事業者が用意するEUの標準契約条項（SCC）や、EU・米国データプライバシーフレームワークなどの仕組みで保護されます。'
					]
				},
				{
					title: '保存する期間',
					items: [
						'アカウントと、本・読書の記録・付箋・ノート・メモ・プロフィール画像: アカウントがあるあいだ。アカウントを削除すると消します',
						'ページの写真: 私たちのサーバーには保存しません。読み取りのあいだ外部の事業者に送り、その事業者の決まりに従って扱われます',
						'操作の記録: アプリの改善に要るあいだ。アカウントのIDではなく、アプリを入れた端末ごとのIDと結びついています',
						'外部の事業者が持つ購入の記録と分析の記録は、各事業者の決まりに従って保管されます'
					]
				},
				{
					title: 'アカウントの削除',
					paragraphs: [
						'アプリの「設定」→「アカウントを削除」で、いつでもアカウントを削除できます。サインインのアカウントと、サーバーにある本・読書の記録・付箋・ノート・メモ・プロフィール画像、1.4.0以前の版のデータが消えます。元に戻せません。',
						'アカウントを削除してもメモリープラスは解約されず、App StoreまたはGoogle Playでの請求が続きます。先に、購入したストアで解約してください。アプリを消すだけでは、サーバーの記録は消えません。',
						'アプリを消したあとでも、下のメールアドレスに削除を頼めます。手順は削除の案内のページ（https://reading-memory-api.taniguchi-kyoichi.com/delete-account）にもあります。'
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
					answer: '「設定」タブの「アカウントを削除」からアカウントと全データを完全に削除できます。この操作は取り消せません。'
				},
				{
					question: '無料とメモリープラスの違いは？',
					answer:
						'本の登録は無料で、冊数の上限はありません。付箋・ノート・ページの文字の読み取り・読書カードとはんこ・カレンダー・ウィジェットも無料でずっと使えます。メモリープラス（年額¥6,000／月額¥600）では、撮ったページの選んだ行を要点に整えること、ノートの言葉をほかの本からも引く索引、1年のまとめ、詳しい統計、書いたメモの要約が使えます。無料のお試しはありません。'
				}
			],
			systemRequirements: 'iOS 26.0以上、Android 8.0以上'
		},
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
			],
			restoreSteps: ['「設定」タブを開く', '「メモリープラス」の「詳しく見る」をタップする', '「購入を復元」をタップする'],
			restoreStepsEn: [
				'Open the 「設定」 (Settings) tab',
				'Tap 「詳しく見る」 (Learn more) on 「メモリープラス」 (Memory Plus)',
				'Tap 「購入を復元」 (Restore purchases)'
			],
			restoreStepsAndroid: ['「設定」を開く', '「メモリープラス」の欄の「購入を復元」をタップする'],
			restoreStepsAndroidEn: [
				'Open 「設定」 (Settings)',
				'In the 「メモリープラス」 (Memory Plus) section, tap 「購入を復元」 (Restore purchases)'
			],
			notes: [
				'無料のお試しはありません。購入を確定したときから代金がかかります',
				'App Storeの米国の価格は 年額 $39.99／月額 $3.99 です。ほかの国と地域の価格は、App StoreとGoogle Playに表示されます'
			]
		},
		en: {
			name: 'Reading Memory',
			privacy: {
				dataItems: [
					'An ID to identify your account (Sign in with Apple or Google). Your email address is held by the service provider we use for sign-in and is not stored with your reading records',
					'The books you add, and your reading records (days you read, pages read, ratings, how a book made you feel, and reading cards)',
					'The sticky notes, notebooks and notes you write about books (including words AI returned in earlier versions)',
					'Photos of pages (only when you snap a page to read its text. They pass through the server while the text is read, and are not stored)',
					'Nickname and profile photo (iPhone version only)',
					'In the iPhone version, records of actions in the app (such as opening the app, searching for a book, or viewing the Memory Plus screen), with the app version and the language and region of your device',
					'In the Android version, records of how the on-device text and barcode reading works (performance numbers, error types, device model and OS, and an ID for each installation). They are sent to the service provider of that feature. They do not include the text read or the photos',
					'Purchase records (purchases, renewals and cancellations on the App Store or Google Play)'
				],
				serviceProviders: [
					'We use outside service providers for sign-in, storing and syncing your books, records, notes and profile photo, analytics of how the app is used, managing purchases, looking up books by title or ISBN, and the AI features. We share only what each purpose needs.',
					'For the AI features, when you snap a page, the photo and the text your device read are sent to put the text back into whole sentences and to turn the lines you pick into key points. When you create a summary of a book, the notes you wrote about that book are sent.'
				],
				sections: [
					{
						title: 'Who we are',
						paragraphs: [
							'Reading Memory is run by an individual developer based in Japan, who is the controller of your data under the EU General Data Protection Regulation (GDPR) and similar laws. Contact details are at the end of this page.'
						]
					},
					{
						title: 'Why we use your information, and our legal bases',
						paragraphs: [
							'We use the information only for the purposes below. We do not use it for advertising, we do not sell it, and we do not track you across other companies\' apps or websites. We do not hand over your notes or page photos for training AI. The text after each purpose is the GDPR legal basis for people in the EU, the UK and similar regions.'
						],
						items: [
							'To provide the app (sign-in, storing and syncing your books, records and notes, reading pages, key points and summaries, and Memory Plus): performance of our contract with you (GDPR Article 6(1)(b))',
							'To understand how the app is used and improve it, and to measure where installs and purchases come from: our legitimate interests (Article 6(1)(f)). We limit this to information that does not include your notes or the content of your books and has little impact on you'
						]
					},
					{
						title: 'Service providers and transfers outside the EU',
						paragraphs: [
							'We are based in Japan, and we use outside service providers to store and process the information. Their servers are outside the EU, including in the United States and Japan.',
							'The EU recognizes Japan as providing an adequate level of protection (an adequacy decision). Transfers to the United States and other countries are protected by the safeguards each provider offers, such as the EU Standard Contractual Clauses (SCCs) or the EU-U.S. Data Privacy Framework.'
						]
					},
					{
						title: 'How long we keep it',
						items: [
							'Your account and your books, reading records, sticky notes, notebooks, notes and profile photo: while you have an account. They are deleted when you delete your account',
							'Photos of pages: not stored on our servers. They are sent to a service provider while the text is read, and that provider handles them under its own rules',
							'Action records: as long as needed to improve the app. They are linked to an ID for each device the app is installed on, not to your account ID',
							'Purchase and analytics records held by our service providers are kept under each provider\'s own rules'
						]
					},
					{
						title: 'Deleting your account',
						paragraphs: [
							'You can delete your account at any time in the app under Settings → Delete Account (「設定」→「アカウントを削除」 in Japanese). This deletes your sign-in account; your books, reading records, sticky notes, notebooks, notes and profile photo on the server; and data from app versions 1.4.0 and earlier. It cannot be undone.',
							'Deleting your account does not cancel Memory Plus, and you will keep being billed on the App Store or Google Play. Cancel it first in the store you bought it from. Deleting the app alone does not delete your records on the server.',
							'Even after you delete the app, you can ask us by email at the address below to delete your account. The steps are also on the account deletion page (https://reading-memory-api.taniguchi-kyoichi.com/en/delete-account).'
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
							'You can permanently delete your account and all of your data from "Delete Account" in the Settings tab. This cannot be undone.'
					},
					{
						question: 'What is the difference between free and Memory Plus?',
						answer:
							'Adding books is free, with no limit on how many. Sticky notes, notebooks, reading text from pages, reading cards and stamps, the calendar and widgets are also free for good. With Memory Plus (¥6,000 per year / ¥600 per month in Japan; $39.99 / $3.99 on the US App Store), you can turn the lines you pick from a page into key points, look up a word from your notebook across all your books, see your year in books and detailed statistics, and get summaries of your notes. There is no free trial.'
					}
				],
				systemRequirements: 'iOS 26.0 or later, Android 8.0 or later'
			},
			subscription: {
				planName: 'Memory Plus',
				prices: [
					{ period: 'Yearly', price: '¥6,000' },
					{ period: 'Monthly', price: '¥600' }
				],
				free: [
					'Adding books (no limit on how many; search by title or scan the barcode)',
					'Sticky notes and notebooks; snapping a page to read its text and adding the lines you pick to your notebook',
					'Reading cards and stamps, and the card box for each year',
					'The calendar of days you read, your streak, basic statistics and badges',
					'Looking back on notes you wrote earlier, and widgets',
					'The index of words in your notebook (for other books, the number of books and the first line)'
				],
				paid: [
					'Turn the lines you picked from a page into key points (uses AI)',
					'Look up a word from your notebook across all your books (every line)',
					'Your year in books (everything you read and wrote in a year, in one place)',
					'Detailed statistics (books finished per month, genres, ratings, and how books made you feel)',
					'Summaries of the notes you wrote (uses AI)'
				],
				restoreSteps: ['Open the "Settings" tab', 'Tap "Learn more" on Memory Plus', 'Tap "Restore purchases"'],
				notes: [
					'There is no free trial. You are charged when you confirm the purchase',
					'On the US App Store, the price is $39.99 per year / $3.99 per month. Prices in other countries and regions are shown on the App Store and Google Play'
				]
			}
		}
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
		privacy: {
			effectiveDate: '2026-11-14',
			dataCollection: 'standard',
			dataItems: [
				'アカウントを識別するためのID（初めて開いたときに作られる匿名のID。AppleまたはGoogleとつないだときは、そのアカウントのID）',
				'メールアドレス（AppleまたはGoogleとつないだときだけ。サインインのために使います）',
				'登録した習慣・ごほうび・目標と、達成や交換の記録（バックアップと同期のため）',
				'アプリ内の操作の記録（アプリを開いた・習慣を達成した・Premiumの画面を見た、など）と、アプリの版、端末の言語と地域。習慣やごほうびの名前、金額、入力した文は含みません',
				'ヘルスケアとモーションの記録（歩数・ワークアウト・睡眠。iPhoneの版だけ）は、許可したときだけ端末の中で読みます。読んだ値はサーバーに送らず、目標に届いた日の達成だけを記録します',
				'購入の記録（App StoreまたはGoogle Playでの無料体験の開始・購入・更新・解約・返金と、その金額と通貨。以前の「広告削除」を含みます）と、広告からアプリを入れたかどうか（iPhoneの版だけ）',
				'通知のための端末の情報（プッシュ通知のトークン、時間帯、言語、アプリの版、通知を許可しているかどうか。iPhoneの版だけ。Androidの版のリマインダーは端末の中で鳴らし、通知のための情報をサーバーに送りません）',
				'ごほうびにつけた写真（つけたときだけ。iPhoneの版だけ）',
				'「ごほうびを頼む」を使ったときの呼び名、ごほうびの名前、目標の回数と進み、送った応援（約束の相手に見えます。iPhoneの版だけ）',
				'シェアのリンクにつける絵（自分でリンクを送るときだけ。iPhoneの版だけ）',
				'約束やシェアのリンクのページを開いた記録（Cookieの乱数を使います。IPアドレスと端末の情報は持ちません）'
			],
			serviceProviders: [
				'サインイン・記録のバックアップと同期・操作と購入と通知の端末の記録の保管・通知の送信・購入の管理と広告からアプリを入れたかどうかの計測・書いた文の読み取りを、外部の事業者に任せています。任せる情報は、その目的に要る分だけです。',
				'iPhoneの版で習慣やごほうびを自分で書いたときは、書いた文と端末の言語・お金の単位をAIで読み取り、習慣やごほうびの形に直します。あなたのIDは送りません。',
				'Androidの版で外部の事業者に任せるのは、サインイン・記録のバックアップと同期・操作と購入の記録の保管・購入の管理です。'
			],
			analyticsUsed: true,
			sections: [
				{
					title: '運営者',
					paragraphs: [
						'ごほうび習慣は、日本に住む個人開発者が運営しています。EU一般データ保護規則（GDPR）などでいう、データの管理者にあたります。連絡先はこのページの最後にあります。'
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
						'私たちは日本にいて、情報の保管と処理を外部の事業者に任せています。事業者のサーバーは米国や日本など、EUの外にあります。',
						'日本はEUから十分な保護の水準があると認められています（十分性認定）。米国などへの移転は、各事業者が用意するEUの標準契約条項（SCC）や、EU・米国データプライバシーフレームワークなどの仕組みで保護されます。'
					]
				},
				{
					title: '保存する期間',
					items: [
						'アカウントと、習慣・ごほうび・目標・達成と交換の記録: アカウントがあるあいだ。アカウントを削除すると消します',
						'操作の記録と購入の記録: アプリの改善と売上の把握に要るあいだ。アカウントを削除したあとは、あなたのIDを無作為なIDに置き換え、あなたと結びつかない形で残します',
						'通知の端末の情報: サインアウトしたとき、アカウントを削除したとき、通知の配信の仕組みがその端末にもう届かないと答えたときに消します',
						'約束とシェアのリンクの絵: 約束が終わってから、またはシェアしてから90日で消します。アカウントを削除したときも消します。相手がいる約束は終わった扱いになり、あなたの名前は相手から見えなくなります',
						'外部の事業者が持つ購入の記録は、各事業者の決まりに従って保管されます'
					]
				},
				{
					title: 'アカウントの削除',
					paragraphs: [
						'アプリの「設定」→「アカウントを削除」で、いつでもアカウントを削除できます。サインインのアカウントと、サーバーとこの端末にある習慣・ごほうび・目標・達成と交換の記録、通知の端末の情報が消えます。元に戻せません。',
						'操作の記録と購入の記録は、あなたのIDを無作為なIDに置き換えて残します。これらに習慣やごほうびの名前、金額、入力した文は含まれません。',
						'アカウントを削除してもPremiumは解約されず、App StoreまたはGoogle Playでの請求が続きます。先に、購入したストアで解約してください。アプリを消すだけでは、サーバーの記録は消えません。',
						'アプリを消したあとでも、下のメールアドレスに削除を頼めます。手順は削除の案内のページ（https://gohobishukan.com/delete-account）にもあります。'
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
						'Premium で Apple または Google とつないでおくと引き継げます。iPhoneとAndroidのあいだでも引き継げます。新しい端末では、設定から前と同じアカウントでサインインしてください（無料）。同じストアで買ったPremiumは、サインインすると自動で引き継がれます。'
				},
				{
					question: '以前に「広告削除」を買いました',
					answer:
						'3.0 から広告は無くなりました。以前に「広告削除」を買った方は、そのまま Premium を使えます。新しい端末では「購入を復元」を押してください。'
				},
				{
					question: 'リマインダーの通知が届きません',
					answer:
						'iPhoneは「設定」→「通知」→「ごほうび習慣」で、Androidは端末の「設定」→「アプリ」→「ごほうび習慣」→「通知」で、通知が許可されているか確かめてください。習慣ごとの通知は、習慣の編集画面から曜日と時刻を決められます。'
				}
			],
			systemRequirements: 'iOS 17.0以上、Android 8.0以上'
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
			restoreSteps: ['「設定」を開く', '「購入を復元」をタップする'],
			restoreStepsEn: ['Open 「設定」 (Settings) in the app', 'Tap 「購入を復元」 (Restore purchases)'],
			notes: [
				'無料のお試しはありません。購入を確定したときから代金がかかります',
				'3.2.0より前の版のアプリでApp Storeの年額を買うときだけ、はじめの7日間を無料で試せます。お試しの終わる24時間前までに解約しないと、そのまま有料の年額に切り替わり、代金が請求されます',
				'2026年10月26日までに使い始めた方は、追加の支払いなしで Premium を使えます',
				'以前に買い切りの「広告削除」を買った方は、追加の支払いなしで Premium を使えます',
				'Androidの版には、タイマーとホーム画面のウィジェットはありません'
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
					'Health and Motion data (steps, workouts and sleep; iPhone version only) is read on your device only if you allow it. The values are not sent to our servers; we record only the completion on days you reach your goal',
					'Purchase records on the App Store or Google Play (start of a free trial, purchases, renewals, cancellations and refunds, with the amount and currency; including the earlier "Remove Ads"), and whether the app was installed from an ad (iPhone version only)',
					'Device information for notifications (the push notification token, time zone, language, app version, and whether notifications are allowed; iPhone version only. In the Android version, reminders are scheduled on your device and no notification information is sent to our servers)',
					'Photos you add to a reward (only when you add one; iPhone version only)',
					'When you use “Ask for a reward”: the name you go by, the reward name, the target and progress, and the cheers you send (the person you asked can see these; iPhone version only)',
					'The image attached to a share link (only when you send a link yourself; iPhone version only)',
					'Records of opening a pact or share link page (using a random value in a cookie; we do not keep your IP address or device information)'
				],
				serviceProviders: [
					'We use outside service providers for sign-in, backup and sync of your records, storing action records, purchase records and device information for notifications, sending notifications, managing purchases and measuring whether the app was installed from an ad, and reading the text you write. We share only what each purpose needs.',
					'In the iPhone version, when you type a habit or reward yourself, the text you typed, with your device language and currency, is read by AI to turn it into a habit or reward. Your ID is not sent.',
					'In the Android version, we use outside service providers only for sign-in, backup and sync of your records, storing action and purchase records, and managing purchases.'
				],
				sections: [
					{
						title: 'Who we are',
						paragraphs: [
							'Reward Habits is run by an individual developer based in Japan, who is the controller of your data under the EU General Data Protection Regulation (GDPR) and similar laws. Contact details are at the end of this page.'
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
							'We are based in Japan, and we use outside service providers to store and process the information. Their servers are outside the EU, including in the United States and Japan.',
							'The EU recognizes Japan as providing an adequate level of protection (an adequacy decision). Transfers to the United States and other countries are protected by the safeguards each provider offers, such as the EU Standard Contractual Clauses (SCCs) or the EU-U.S. Data Privacy Framework.'
						]
					},
					{
						title: 'How long we keep it',
						items: [
							'Your account and your habits, rewards, goals, and completion and exchange records: while you have an account. They are deleted when you delete your account',
							'Action records and purchase records: as long as needed to improve the app and understand revenue. After you delete your account, we replace your ID with a random ID and keep them in a form that is no longer linked to you',
							'Device information for notifications: deleted when you sign out, when you delete your account, or when the notification delivery service reports that the device can no longer be reached',
							'Pacts and share link images: deleted 90 days after a pact ends or after you share. They are also deleted when you delete your account. A pact with another person is marked as ended, and your name is no longer shown to them',
							'Purchase records held by our service providers are kept under each provider\'s own rules'
						]
					},
					{
						title: 'Deleting your account',
						paragraphs: [
							'You can delete your account at any time in the app under Settings → Delete Account (「設定」→「アカウントを削除」 in Japanese). This deletes your sign-in account; your habits, rewards, goals, and completion and exchange records on the server and on this device; and the device information for notifications. It cannot be undone.',
							'Action records and purchase records are kept with your ID replaced by a random ID. They do not contain the names of your habits or rewards, amounts, or text you type.',
							'Deleting your account does not cancel Premium, and you will keep being billed on the App Store or Google Play. Cancel it first in the store you bought it from. Deleting the app alone does not delete your records on the server.',
							'Even after you delete the app, you can ask us by email at the address below to delete your account. The steps are also on the account deletion page (https://gohobishukan.com/delete-account).'
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
							'Yes, if you connect Apple or Google with Premium. This also works between iPhone and Android. On the new device, sign in with the same account in Settings (free). Premium bought in the same store is carried over automatically when you sign in.'
					},
					{
						question: 'I bought "Remove Ads" before',
						answer:
							'Ads were removed in 3.0. If you bought "Remove Ads" before, you can keep using Premium as is. On a new device, tap "Restore purchases".'
					},
					{
						question: 'Reminder notifications do not arrive',
						answer:
							'On iPhone, check Settings → Notifications → Reward Habits. On Android, check the device Settings → Apps → Reward Habits → Notifications. Make sure notifications are allowed. For each habit, you can set the days and time of its notification on the habit\'s edit screen.'
					}
				],
				systemRequirements: 'iOS 17.0 or later, Android 8.0 or later'
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
					'There is no free trial. You are charged when you confirm the purchase',
					'Only when you buy the annual plan on the App Store from an app version earlier than 3.2.0, you can try it free for the first 7 days. Unless you cancel at least 24 hours before the trial ends, it switches to the paid annual plan and you are charged',
					'If you started using the app on or before October 26, 2026, you can use Premium at no additional cost',
					'If you bought the earlier one-time "Remove Ads" purchase, you can use Premium at no additional cost',
					'The Android version does not have the timer or the Home Screen widget'
				]
			}
		}
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
		// 掲載は3本（読書メモリー・ごほうび習慣・じぶんBGM）に絞った。規約・プライバシー・サポートのページは残す。
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
		privacy: {
			// 本文を実態に合わせて書き直した日。**中身を直したらここも直す** ——
			// 表示だけ古い日付が残ると、法務ページがそのページ自身の内容と食い違う。
			effectiveDate: '2026-11-03',
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
			serviceProviders: [
				'サインイン・データと写真の保管と世帯のあいだの同期・利用状況の分析・通知の配信・購入の管理・レシートと商品名の読み取り・バーコードから商品名を調べること（バーコードの番号を送ります）を、外部の事業者に任せています。任せる情報は、その目的に要る分だけです。'
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
		privacy: {
			effectiveDate: '2026-11-14',
			dataCollection: 'minimal',
			dataItems: [
				'匿名のインストール ID（初回の起動で端末が作るランダムな文字列。アカウントとは結び付けません）',
				'アプリ内の操作の記録（例: 画面を開いた、BGMを流した。値は数の範囲や決まった語だけで、BGMの名前や入力した文字は送りません）',
				'サインインしたときだけ: メールアドレス・名前・ユーザーID（有料プランを別の端末に引き継ぐためだけに使います。名前はサインインを任せている外部の事業者が持ち、アプリの画面に出すだけです）',
				'有料プランの期限（サインインしているときはユーザー ID と一緒に）',
				'音の配信のときに、接続元の IP アドレス（配信と不正利用の防止のため）',
				'作ったBGM・お気に入り・集中の記録・外観の設定は端末の中だけに保存し、送りません',
				'購入の記録（App StoreまたはGoogle Playでの購入・更新・解約）',
				'広告ID（iPhoneのIDFA、Androidの広告ID）は読みません。広告もトラッキングもありません'
			],
			serviceProviders: [
				'サインイン（Appleでサインイン・Googleでサインインしたときだけ）・音とカタログの配信・操作の記録の保管・購入の管理を、外部の事業者に任せています。任せる情報は、その目的に要る分だけです。'
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
						'定番のBGMを流す・タイマー・ロック画面とコントロールセンター（Androidはクイック設定と通知）からの操作は無料です。曲と環境音を重ねて自分のBGMを保存すること、ウィジェットで流すBGMを選ぶことはプレミアム（年額¥6,000 / 月額¥1,200）です。'
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
						'iPhoneでは、BGMの一覧の右上の人のアイコンから「アカウント」を開き、「アカウントを削除」をタップしてください。Androidでは、右上の人のアイコンから「設定」を開き、「サインイン」の欄の「アカウントを削除」をタップしてください。端末に保存したBGMは端末に残ります。アカウントを削除しても有料プランは解約されないので、先に、購入したストアで解約してください。手順は削除の案内のページ（https://jibun-bgm.taniguchi-kyoichi.com/delete-account）にもあります。'
				}
			],
			systemRequirements: 'iOS 27.0以上、Android 8.0以上'
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
				'ロック画面・コントロールセンター（Androidはクイック設定と通知）からの操作',
				'広告なし・再生時間の制限なし'
			],
			paid: ['曲と環境音を重ねて、自分のBGMとして保存', 'ウィジェットで流すBGMを選ぶ'],
			restoreSteps: [
				'BGMの一覧の右上の人のアイコンから「アカウント」を開く',
				'「プラン」の「有料にする」をタップする',
				'「購入を復元」をタップする'
			],
			restoreStepsEn: [
				'On the BGM list, tap the person icon at the top right to open 「アカウント」 (Account)',
				'Under 「プラン」 (Plan), tap 「有料にする」 (Upgrade)',
				'Tap 「購入を復元」 (Restore purchases)'
			],
			restoreStepsAndroid: [
				'BGMの一覧の右上の人のアイコンから「設定」を開く',
				'「サブスクリプション」の「プレミアムにする」をタップする',
				'「購入を復元」をタップする'
			],
			restoreStepsAndroidEn: [
				'On the BGM list, tap the person icon at the top right to open 「設定」 (Settings)',
				'Under 「サブスクリプション」 (Subscription), tap 「プレミアムにする」 (Go Premium)',
				'Tap 「購入を復元」 (Restore purchases)'
			]
		}
	}
];

/** 通常の Products 一覧に出す（非表示・build in public を除く） */
export const visibleProducts = products.filter((p) => !p.hidden && !p.buildInPublic);
/** build in public 専用セクションに出す */
export const buildingInPublic = products.filter((p) => !p.hidden && p.buildInPublic);
