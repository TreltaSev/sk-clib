export declare const MODES: readonly ['light', 'dark'];
export type Mode = string | (typeof MODES)[number];

export declare const VARIANTS: readonly [
	'content',
	'expressive',
	'fidelity',
	'fruit-salad',
	'monochrome',
	'neutral',
	'rainbow',
	'tonal-spot',
	'vibrant'
];
export type Variant = string | (typeof VARIANTS)[number];
