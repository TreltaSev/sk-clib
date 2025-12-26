<script lang="ts">
	// --- Logic ---
	import { cn } from '@lib/utils';
	import type { Props } from '..';
	import { onMount } from 'svelte';

	// === State ===
	import { theme, build, applyScheme, saveTheme } from '@lib/theme';

	const {
		defaults = {
			defaultMode: 'dark',
			defaultVariant: 'vibrant',
			defaultSeedColor: '#f8b518'
		}
	}: Props = $props();

	onMount(() => {
		const colorSeed = document.documentElement.style.getPropertyValue("--color-seed")
		if (colorSeed) {
			theme.seedColor = colorSeed 
		}
	})

	/**
	 * Checks if the user already has a set md-theme
	 */
	function hasTheme() {
		const match = document.cookie.match(/(?:^|;\s*)md-theme=([^;]*)/);
		return match ? true : false;
	}

	/**
	 * Returns a fallback value if designated value is undefined
	 * @param value Value to return normally
	 * @param _default default if value is undefined
	 */
	function fallback(value: any, _default: any) {
		return value === undefined ? _default : value;
	}

	// Whenever any state changes, refresh theme
	$effect(() => {
		// Get fallback values
		theme.mode = fallback(theme.mode, defaults.defaultMode);
		theme.variant = fallback(theme.variant, defaults.defaultVariant);
		theme.seedColor = fallback(theme.seedColor, defaults.defaultSeedColor);

		// Build the theme with material utilities
		const built = build(theme.seedColor, theme.mode, theme.variant);
		
		// Create css variables object and save to body
		let applied = applyScheme(built);

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
			return match ? JSON.parse(decodeURIComponent(match[1])) : undefined;
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
