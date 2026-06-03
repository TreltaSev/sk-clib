import type { ClassValue, HTMLAttributes } from 'svelte/elements';

export type tSpacerProps = HTMLAttributes<HTMLDivElement> & {
	// Direction

	// Horizontal / Vertical
	horizontal?: boolean;
	vertical?: boolean;

	// Width / Height
	width?: boolean;
	height?: boolean;
};
