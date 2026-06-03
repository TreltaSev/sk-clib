export const MODES = ['light', 'dark'] as const;
export type Mode = (typeof MODES)[number];

export const VARIANTS = [
    'content',
    'expressive',
    'fidelity',
    'fruit-salad',
    'monochrome',
    'neutral',
    'rainbow',
    'tonal-spot',
    'vibrant'
] as const;
export type Variant = (typeof VARIANTS)[number];
