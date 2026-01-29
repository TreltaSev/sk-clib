import type { ClassValue, HTMLInputAttributes } from "svelte/elements";
import type { tFrameProps } from "../frame/types"

export type tInputProps = tFrameProps & HTMLInputAttributes & {
    classLabel?: ClassValue;
};