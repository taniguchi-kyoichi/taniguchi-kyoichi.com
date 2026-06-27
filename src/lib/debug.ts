import { dev, browser } from '$app/environment';

/**
 * Debug mode — for inspecting layout/responsive behavior without UX flourishes
 * (typewriter placeholder, entrance/gradient animations) getting in the way.
 *
 * Active ONLY when BOTH are true:
 *   1. `dev` — a local `vite dev` build. In production `dev` is compiled to
 *      `false`, so every call below is dead code and tree-shaken away. Debug
 *      mode can never turn on in production.
 *   2. the URL contains `?debug` (e.g. http://localhost:5173/?debug).
 *
 * Combine with Chrome DevTools device mode (Cmd+Shift+M) to test true mobile
 * breakpoints with animations disabled.
 */
export function isDebug(): boolean {
	return dev && browser && new URLSearchParams(location.search).has('debug');
}
