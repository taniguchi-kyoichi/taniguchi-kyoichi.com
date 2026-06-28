import type { Profile, Contact } from '$lib/types';

export const profile: Profile = {
	name: '谷口 恭一',
	nameEn: 'Kyoichi Taniguchi',
	title: 'iOS Engineer',
	bio: 'iOSエンジニア。Swift & SwiftUI を使ったネイティブiOSアプリ開発に情熱を注いでいます。モバイルアプリケーションへのAI統合技術も探求中。',
	avatar: '/profile.jpg',
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

export const contact: Contact = {
	email: 'info@taniguchi-kyoichi.com',
	message: 'お仕事のご依頼やお問い合わせはメールにてご連絡ください。'
};
