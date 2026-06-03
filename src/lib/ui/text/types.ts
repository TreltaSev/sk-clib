import type { HTMLAttributes } from 'svelte/elements';
import type { tHeaderWeights } from '../header/types';

export type tTextSizes = {
	xxl: 'h1';
	xl: 'h2';
	lg: 'h3';
	md: 'h4';
	sm: 'h5';
};

export const tags = [
	'p',
	'blockquote',
	'q',
	'cite',
	'abbr',
	'dfn',
	'time',
	'address',
	'code',
	'pre',
	'samp',
	'kbd',
	'var',
	'strong',
	'em',
	'mark',
	'small',
	'sub',
	'sup',
	'b',
	'i',
	'u',
	'span'
] as const;

export type tTextTypes = (typeof tags)[number];

export type tTextWeights = {
	light: 'font-light';
	regular: 'font-normal';
	semibold: 'font-semibold';
	bold: 'font-bold';
	extrabold: 'font-extrabold';
};

export type tTextProps = HTMLAttributes<HTMLDivElement> & {

    // As Element
    as?: tTextTypes;

    // Sizes
    size?: keyof tTextSizes; // Catch All
    xxl?: boolean;
	xl?: boolean;
	lg?: boolean;
	md?: boolean;
	sm?: boolean;
    
    // Weights
    weight?: keyof tHeaderWeights; // Catch All
    extrabold?: boolean;
	bold?: boolean;
	semibold?: boolean;
	regular?: boolean;
	light?: boolean;

    // Italicization
    em?: boolean;
};
