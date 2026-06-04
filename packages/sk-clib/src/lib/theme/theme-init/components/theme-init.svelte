<script lang="ts">
	// --- Logic ---
	import { cn } from '@utils/classname';
	import type { Props } from '..';
	import { onMount } from 'svelte';

	import Cookie from "js-cookie";

	// === State ===
	import { theme, build, applyScheme, saveTheme } from '@theme';
	import { parse } from 'svelte/compiler';

	const {
		defaults = {
			defaultMode: 'dark',
			defaultVariant: 'vibrant',
			defaultSeedColor: '#f8b518'
		}
	}: Props = $props();

	$effect.pre(() => {
		let mode = Cookie.get("theme.mode") || defaults.defaultMode
		let variant = Cookie.get("theme.variant") || defaults.defaultVariant
		let color = Cookie.get("theme.color") || defaults.defaultSeedColor
	
		theme.seedColor = color
		theme.mode = mode
		theme.variant = variant
	})

	$effect(() => {Cookie.set("theme.mode", theme.mode)})
	$effect(() => {Cookie.set("theme.variant", theme.variant)})
	$effect(() => {Cookie.set("theme.color", theme.seedColor)})

	// Whenever any state changes, refresh theme
	$effect(() => {
		// Build the theme with material utilities
		const built = build(theme.seedColor, theme.mode, theme.variant);
		
		// Create css variables object and save to body
		let applied = applyScheme(built, theme.seedColor, theme.mode, theme.variant);

		// Save the theme to the user's cookies
		saveTheme(applied);
	});
</script>

<svelte:head>
	<!-- ============== Theme Script ============== -->
	<script>
		/**
		 * Attempts to get the current theme stored in the user's cookies, returns it, otherwise undefined
		 * @return {Object|undefined} The theme or undefined
		 */
		function getTheme() {
			const match = document.cookie.match(/(?:^|;\s*)md-theme=([^;]*)/);

			let parsed = undefined;
			try {
				parsed = JSON.parse(decodeURIComponent(match[1]))
			} catch {/* Do Nothing */}

			return parsed ? parsed : undefined;
		}

		/**
		 * Attempts to apply a given theme
		 * @param {Object|undefined} theme - The theme to be applied, if undefined, this method does nothing
		 */
		function applyTheme(theme) {
			if (theme === undefined) {
				return;
			}

			for (const [name, hex] of Object.entries(theme)) {
				document.documentElement.style.setProperty(name, hex);
			}
		}

		applyTheme(getTheme());
	</script>
</svelte:head>

<!--@component
    ---
    name: ThemeInit
    props:
        defaultSeed (undefined|string) = undefine Default color seed for the theme.        
    ---

    Used to initialize the theme within your projects
-->
