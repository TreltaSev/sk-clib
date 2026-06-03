import type { HTMLAttributes } from "svelte/elements";

export type tFrameProps = HTMLAttributes<HTMLDivElement> & {
    // Classes:
    
    // Extra Props Here:
    
    // Flex Box
    flex?: boolean;
    row?: boolean;
    col?: boolean;

    // Positioning
    centerx?: boolean;
    centery?: boolean;
    center?: boolean;

    // Size Fillings
    fill?: boolean;
    fillw?: boolean;
    fillh?: boolean;

    // Flex Config
    noshrink?: boolean;

    // Aspect Ratios
    aspectSquare?: boolean;
    
    // Cursor Options
    cursorAuto?: boolean;
    cursorDefault?: boolean;
    cursorPointer?: boolean;

    // Theme Colors
    background?: boolean;
    primary?: boolean;
    primaryContainer?: boolean;
    secondary?: boolean;
    secondaryContainer?: boolean;
    tertiary?: boolean;
    tertiaryContainer?: boolean;
    error?: boolean;
    surface?: boolean;
    surfaceVariant?: boolean;
    outline?: boolean;
    outlineVariant?: boolean;
    shadow?: boolean;
    scrim?: boolean;
    inverseSurface?: boolean;
    inversePrimary?: boolean;
};