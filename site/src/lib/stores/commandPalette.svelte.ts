// Shared open-state for the ⌘K AI command palette, so any component (header
// button, palette itself, global shortcut) can toggle it. Exported as a $state
// object property to keep cross-module reactivity.
export const palette = $state({ open: false });

export function openPalette() {
	palette.open = true;
}
