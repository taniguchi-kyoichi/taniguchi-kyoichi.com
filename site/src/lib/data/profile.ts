import type { About, Profile, Contact } from '$lib/types';

export const profile: Profile = {
	name: '谷口 恭一',
	nameEn: 'Kyoichi Taniguchi',
	title: 'iOS Engineer',
	bio: 'iOSエンジニア。Swift & SwiftUI を使ったネイティブiOSアプリ開発に情熱を注いでいます。モバイルアプリケーションへのAI統合技術も探求中。',
	avatar: '/profile.webp',
	location: '神奈川県横浜市',
	socialLinks: [
		{
			platform: 'github',
			url: 'https://github.com/taniguchi-kyoichi',
			label: 'GitHub'
		},
		{
			platform: 'zenn',
			url: 'https://zenn.dev/kyoichi',
			label: 'Zenn'
		},
		{
			platform: 'note',
			url: 'https://note.com/note_kyoichi',
			label: 'note'
		},
		{
			platform: 'youtube',
			url: 'https://youtube.com/@taniguchi-kyoichi',
			label: 'YouTube'
		}
	],
	secondaryLinks: [
		{
			platform: 'twitter',
			url: 'https://x.com/x_kyoichi',
			label: 'x.com'
		},
		{
			platform: 'wantedly',
			url: 'https://www.wantedly.com/id/taniguchi_kyoichi',
			label: 'Wantedly'
		},
		{
			platform: 'linkedin',
			url: 'https://www.linkedin.com/in/taniguchi-kyoichi/',
			label: 'LinkedIn'
		}
	]
};

/**
 * AI に質問（/api/chat）で渡す本人の話。サイトの bio と違い、技術の名前は入れない
 * （製品の作り方は出さない方針。tool が返さなければ AI も言わない）。
 */
export const about: About = {
	bio: 'iOSエンジニア。自分で企画したiOSアプリを作って、App Storeで公開しています。アプリにAIを組み込むことも探っています。',
	background: [
		'iOSアプリを作るエンジニアです',
		'公開しているアプリは、読書メモリー・ごほうび習慣・じぶんBGMの3つです',
		'作ったものや学んだことを、Zenn と note の記事、YouTube の動画で発信しています',
		'作る中で生まれたライブラリをオープンソースで公開しています',
		'神奈川県横浜市に住んでいます'
	],
	interests: ['モバイルアプリへのAIの組み込み'],
	work: 'お仕事のご依頼・ご相談はメール（info@taniguchi-kyoichi.com）で受け付けています。内容を書いて送ってください。'
};

export const contact: Contact = {
	email: 'info@taniguchi-kyoichi.com',
	message: 'お仕事のご依頼やお問い合わせはメールにてご連絡ください。'
};
