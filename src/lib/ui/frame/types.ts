import type { ClassValue, HTMLAttributes } from "svelte/elements";

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
};