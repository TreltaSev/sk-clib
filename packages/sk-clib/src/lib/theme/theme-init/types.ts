import type { HTMLAttributes } from 'svelte/elements';


/**
 * Possible default types, object contains
 * `defaultMode`,
 * `defaultVariant`,
 * `defaultSeedColor`
 */
export type tDefaults = {

    // Default mode of the theme, either light or dark
	defaultMode: 
        | 'dark' 
        | 'light' 
        | undefined;

    // Default variant of the theme, Changes the look and feel of the used colors
	defaultVariant:
		| 'content'
		| 'expressive'
		| 'fidelity'
		| 'fruit-salad'
		| 'monochrome'
		| 'neutral'
		| 'rainbow'
		| 'tonal-spot'
		| 'vibrant'
		| undefined;

    // Default main color used to generate the theme
	defaultSeedColor: 
		| string 
		| undefined;
};

export type tThemeInitProps = HTMLAttributes<HTMLDivElement> & {
	defaults?: tDefaults;
};
