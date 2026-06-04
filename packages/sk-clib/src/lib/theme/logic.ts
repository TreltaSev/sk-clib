import { snakeOrKebabToCamel, snakeToKebab } from '@utils/string';
import type { Mode, Variant } from '@theme/types';

import {
	argbFromHex,
	DynamicScheme,
	Hct,
	hexFromArgb,
	SchemeContent,
	Variant as PVariant,
	SchemeExpressive,
	SchemeFidelity,
	SchemeFruitSalad,
	SchemeMonochrome,
	SchemeNeutral,
	SchemeRainbow,
	SchemeTonalSpot,
	SchemeVibrant,
    DynamicColor
} from '@poupe/material-color-utilities';

// map variant keys to scheme constructor functions
const VARIANTMAP: Record<Variant, any> = {
	content: SchemeContent,
	expressive: SchemeExpressive,
	fidelity: SchemeFidelity,
	'fruit-salad': SchemeFruitSalad,
	monochrome: SchemeMonochrome,
	neutral: SchemeNeutral,
	rainbow: SchemeRainbow,
	'tonal-spot': SchemeTonalSpot,
	vibrant: SchemeVibrant
};

/**
 * Returns a dictionary representation of a generated color pallette given a `seed` `mode` and `contrast`
 *
 *
 * @param seed Hex color string like `#ff0000`
 * @param mode Chooses light/dark rendering
 * @param variant Selects the algorithm variant
 * @param contrast is a -1..1 modifier for contrast
 */
export function build(
	seed: string,
	mode: Mode = 'dark',
	variant: Variant = 'content',
	contrast: number = 0
): DynamicScheme {
	const source: Hct = Hct.fromInt(argbFromHex(seed));
	const isDark: boolean = mode == 'dark';
	const SchemeCtor = VARIANTMAP[variant] ?? SchemeContent;
	const schemeRaw = new SchemeCtor(source, isDark, contrast) as DynamicScheme;

	return schemeRaw;
}

/**
 * Applies a given scheme to the root document element
 *
 * @param scheme Generated scheme that will be applied to the root element
 */
export function applyScheme(scheme: DynamicScheme): Record<string, any> {
	const mode = scheme.isDark ? 'dark' : 'light';
	const variant = Object.values(PVariant)[scheme.variant].toString().toLowerCase();

	const root = document.documentElement;

    // Apply missing colors that library for some reason doesn't cover @material-color-utilities#199
    const missingColors = [
        "shadow",
        "scrim",
        "surfaceVariant",
        "surfaceTint",
        "primaryPaletteKeyColor",
        "secondaryPaletteKeyColor",
        "tertiaryPaletteKeyColor",
        "neutralPaletteKeyColor",
        "neutralVariantPaletteKeyColor"
    ]
	
	// This variable will be saved in the cookies, also what is returned.
	let cached_scheme: Record<string, any> = {};
    
    // Set the color properties
    const allColors = [...scheme.colors.allColors, ...missingColors]
	allColors.forEach((dynamicColor) => {
		const colorName = typeof dynamicColor === 'string' ? dynamicColor : dynamicColor.name;
        const prop = snakeOrKebabToCamel(colorName) as keyof DynamicScheme;
		const value = scheme[prop] as unknown as number;
		root.style.setProperty(`--md-${snakeToKebab(colorName)}`, hexFromArgb(value));
		cached_scheme[`--md-${snakeToKebab(colorName)}`] = hexFromArgb(value);
	});

	const conf_out = {
		'--md-seed': hexFromArgb(scheme.sourceColorArgb),
		'--md-mode': mode,
		'--md-variant': variant
	};

	// Add conf_out to cached_scheme
	cached_scheme = {...cached_scheme, ...conf_out};

    // Set the config properties
	for (const [key, value] of Object.entries(conf_out)) {
		root.style.setProperty(key, value);
	}

	return cached_scheme;
}

/**
 * Stores the theme as a string in cookies 
 * 
 * @param theme JSON object to store
 */
export function saveTheme(theme: object) {
	const expires = new Date();
	expires.setFullYear(expires.getFullYear() + 10);
	document.cookie = `md-theme=${JSON.stringify(theme)}; expires=${expires.toUTCString()}; path=/`;
}