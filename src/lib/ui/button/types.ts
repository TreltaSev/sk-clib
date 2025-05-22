import type { ClassValue, HTMLButtonAttributes } from "svelte/elements";

export type tButtonProps = HTMLButtonAttributes & {
    // Extra Props Here:
    buttonClass?: ClassValue;
};