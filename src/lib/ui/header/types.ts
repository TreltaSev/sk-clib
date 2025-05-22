import type { HTMLAttributes } from 'svelte/elements';

export type tHeaderSizes = {
	xxl: 'h1';
	xl: 'h2';
	lg: 'h3';
	md: 'h4';
	sm: 'h5';
};

export type tHeaderWeights = {
	light: 'font-light';
	regular: 'font-normal';
	semibold: 'font-semibold';
	bold: 'font-bold';
	extrabold: 'font-extrabold';
};

export type tHeaderProps = HTMLAttributes<HTMLDivElement> & {
	// Extra Props Here:

	// Sizes
	size?: keyof tHeaderSizes; // Catch All
	xxl?: boolean;
	xl?: boolean;
	lg?: boolean;
	md?: boolean;
	sm?: boolean;

	// As Element
	as?: tHeaderSizes[keyof tHeaderSizes]; // Catch All

	// Weights
	weight?: keyof tHeaderWeights; // Catch All
	extrabold?: boolean;
	bold?: boolean;
	semibold?: boolean;
	regular?: boolean;
	light?: boolean;

	// Italicization
	em?: boolean;
};
