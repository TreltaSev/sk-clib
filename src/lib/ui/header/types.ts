import type { ClassValue, HTMLAttributes } from "svelte/elements";

export type tHeaderProps = HTMLAttributes<HTMLDivElement> & {
    // Extra Props Here:
    headerClass?: ClassValue 
};