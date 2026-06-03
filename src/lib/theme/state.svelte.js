


/**
 * Class representing the current state of the theme
 * 
 * If either `mode`, `variant` or `seedColor` are updated, the whole theme will refresh
 */
class ThemeState {

    /**
     * Current mode of the theme, either light or dark
     * @type {"dark"|"light"|undefined}
     */
    mode = $state(undefined)

    /**
     * Variant of the theme, Changes the look and feel of the used colors
     * @type {"content"|"expressive"|"fidelity"|"fruit-salad"|"monochrome"|"neutral"|"rainbow"|"tonal-spot"|"vibrant"|undefined}
     */
    variant = $state(undefined)

    /**
     * Main color used to generate the theme.
     * @type {string|undefined}
     */
    seedColor = $state(undefined)
}

const theme_state = new ThemeState();

export { theme_state }

