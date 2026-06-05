/**
 * Clamps a number between a given min and max 
 * @public
 * 
 * @param number - Number to clamp
 * @param min - Minimum the number can be
 * @param max - Maximum the number can be
 */
export function clamp(number: number, min: number, max: number) {
    return Math.max(min, Math.min(number, max));
}