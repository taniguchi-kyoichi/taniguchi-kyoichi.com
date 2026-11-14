import type { Platform, Product, ProductTheme } from '$lib/types';

/** 世界観を持たない製品に使う、飾りのない色 */
const NEUTRAL_THEME: ProductTheme = {
	bg: '#ffffff',
	fg: '#111827',
	accent: '#2563eb',
	muted: '#4b5563'
};

export function themeOf(product: Pick<Product, 'showcase'>): ProductTheme {
	return product.showcase?.theme ?? NEUTRAL_THEME;
}

/** カードとページの地に CSS 変数として渡す */
export function themeStyle(product: Pick<Product, 'showcase'>): string {
	const t = themeOf(product);
	return `--pw-bg:${t.bg};--pw-fg:${t.fg};--pw-accent:${t.accent};--pw-muted:${t.muted}`;
}

/** カードの「目的の一言」。キャッチが無い製品は説明で代える */
export function purposeOf(product: Product): string {
	return product.showcase?.catch ?? product.description;
}

const DEVICE_LABEL: Partial<Record<Platform, string>> = {
	ios: 'iPhone',
	android: 'Android',
	web: 'Web',
	macos: 'Mac'
};

/** 対応の機種を、使う人の呼び方で（例: iPhone・Android） */
export function devicesOf(product: Product): string {
	return product.platforms
		.map((p) => DEVICE_LABEL[p])
		.filter((label): label is string => !!label)
		.join('・');
}

/** App Store の URL の id（Smart App Banner の app-id） */
export function appStoreIdOf(product: Product): string | undefined {
	return product.links.appStore?.match(/\/id(\d+)/)?.[1];
}

/** ¥6,000 → 6,000円 */
function yen(price: string): string {
	return `${price.replace(/^¥/, '')}円`;
}

/**
 * 価格の小さな1行。サブスクリプションの条件（利用規約と同じデータ）から作るので、
 * 規約と食い違わない。例: 無料・メモリープラスは月額600円・年額6,000円
 */
export function priceLineOf(product: Product): string | undefined {
	const s = product.subscription;
	if (!s) return product.price;
	const order = ['月額', '年額'];
	const prices = [...s.prices]
		.sort((a, b) => order.indexOf(a.period) - order.indexOf(b.period))
		.map((p) => `${p.period}${yen(p.price)}`)
		.join('・');
	return `無料・${s.planName}は${prices}`;
}
