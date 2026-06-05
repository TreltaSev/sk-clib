import type { Mode, Variant } from "./types";

/**
 * Class representing the current state of the theme
 * @public
 * 
 * If either `mode`, `variant` or `seedColor` are updated, the whole theme will refresh
 */
class ThemeState {

    /**
     * Current mode of the theme, either light or dark
     */
    mode: Mode | undefined = $state(undefined)

    /**
     * Variant of the theme, Changes the look and feel of the used colors
     */
    variant: Variant | undefined = $state(undefined)

    /**
     * Main color used to generate the theme.
     */
    seedColor: string | undefined = $state(undefined)
}

const theme_state = new ThemeState();

export { theme_state }

