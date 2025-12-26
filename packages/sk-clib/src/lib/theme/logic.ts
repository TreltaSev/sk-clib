/* eslint-disable @typescript-eslint/no-explicit-any */
import { argbFromHex, SchemeTonalSpot, Hct, hexFromArgb, SchemeContent, SchemeExpressive, SchemeFidelity, SchemeFruitSalad, SchemeMonochrome, SchemeNeutral, SchemeRainbow, SchemeVibrant } from '@material/material-color-utilities';

import { Mode, Variant } from "./types"

export function saveTheme(theme: object) {
	const expires = new Date();
	expires.setFullYear(expires.getFullYear() + 10);
	document.cookie = `md-theme=${JSON.stringify(theme)}; expires=${expires.toUTCString()}; path=/`;
}

export function build(seedHex: string, mode: Mode = "dark", variant: Variant = "vibrant", contrast: number = 0) {

	const variant_map: Record<string, any> = {
		"content": SchemeContent,
		"expressive": SchemeExpressive,
		"fidelity": SchemeFidelity,
		"fruit-salad": SchemeFruitSalad,
		"monochrome": SchemeMonochrome,
		"neutral": SchemeNeutral,
		"rainbow": SchemeRainbow,
		"tonal-spot": SchemeTonalSpot,
		"vibrant": SchemeVibrant
	}

	if (!(variant in variant_map)) {
		variant = "content"
	}
	
	const source = Hct.fromInt(argbFromHex(seedHex))
	const isDark = mode === "dark"
	const scheme = new variant_map[variant](source, isDark, contrast);

	return scheme
}


export function applyScheme(scheme: any) {
	const map: Record<string, number> = {
		"--color-seed": scheme.sourceColorArgb,
		"--color-primary": scheme.primary,
		"--color-on-primary": scheme.onPrimary,
		"--color-primary-container": scheme.primaryContainer,
		"--color-on-primary-container": scheme.onPrimaryContainer,
		"--color-secondary": scheme.secondary,
		"--color-on-secondary": scheme.onSecondary,
		"--color-secondary-container": scheme.secondaryContainer,
		"--color-on-secondary-container": scheme.onSecondaryContainer,
		"--color-tertiary": scheme.tertiary,
		"--color-on-tertiary": scheme.onTertiary,
		"--color-tertiary-container": scheme.tertiaryContainer,
		"--color-on-tertiary-container": scheme.onTertiaryContainer,
		"--color-error": scheme.error,
		"--color-on-error": scheme.onError,
		"--color-error-container": scheme.errorContainer,
		"--color-on-error-container": scheme.onErrorContainer,
		"--color-background": scheme.background,
		"--color-on-background": scheme.onBackground,
		"--color-surface": scheme.surface,
		"--color-on-surface": scheme.onSurface,
		"--color-surface-variant": scheme.surfaceVariant,
		"--color-on-surface-variant": scheme.onSurfaceVariant,
		"--color-outline": scheme.outline,
		"--color-outline-variant": scheme.outlineVariant,
		"--color-shadow": scheme.shadow,
		"--color-scrim": scheme.scrim,
		"--color-inverse-surface": scheme.inverseSurface,
		"--color-inverse-on-surface": scheme.inverseOnSurface,
		"--color-inverse-primary": scheme.inversePrimary
	}
	const out: any = {}
	const root = document.documentElement
	for (const [name, argb] of Object.entries(map)) {
		out[name] = hexFromArgb(argb)
		root.style.setProperty(name, hexFromArgb(argb))
	}
	return out
}
