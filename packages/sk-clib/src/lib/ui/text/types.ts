import type { HTMLAttributes } from 'svelte/elements';
import type { tHeaderWeights } from '../header/types';

/**
 * Representation of semantic sizes to header element
 */
export type tTextSizes = {
	xxl: 'h1';
	xl: 'h2';
	lg: 'h3';
	md: 'h4';
	sm: 'h5';
};


/**
 * List of valid html tags that can be used with the text element
 */
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
	'span',
	'h1',
	'h2',
	'h3',
	'h4',
	'h5',
	'h6'
] as const;

export type tTextTypes = (typeof tags)[number];

export type tTextWeights = {
	light: 'font-light';
	regular: 'font-normal';
	semibold: 'font-semibold';
	bold: 'font-bold';
	extrabold: 'font-extrabold';
};

/**
 * Text Element Properties
 * @internal
 * 
 */
export type tTextProps = HTMLAttributes<HTMLDivElement> & {

    /**
	 * The element that the text element will take
	 */
    as?: tTextTypes;

    // Sizes

	/**
	 * Semantic size option for the text element
	 */
    size?: keyof tTextSizes;

    xxl?: boolean;
	xl?: boolean;
	lg?: boolean;
	md?: boolean;
	sm?: boolean;
    
    /**
	 * Semantic bolding option for the text element
	 */
    weight?: keyof tHeaderWeights; // Catch All
    extrabold?: boolean;
	bold?: boolean;
	semibold?: boolean;
	regular?: boolean;
	light?: boolean;

    /**
	 * Whether or not the text is italicized
	 */
    em?: boolean;
};
