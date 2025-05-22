/* eslint-disable @typescript-eslint/no-explicit-any */
import type { SvelteComponent } from 'svelte';

/**
 * Read DocComponent object, where `.component` is just a svelteComponent that can be rendered
 */
export type DocComponent = {
	path: string;
	component: typeof SvelteComponent;
	metadata?: Record<string, unknown>;
};

/**
 * Represents a Svelte component that has been dynamically imported.
 *
 * @property default - The default export of the imported module, which should be a Svelte component constructor.
 */
export type ImportedComponent = {
	default: typeof SvelteComponent;
	metadata: Record<string, unknown>;
};

/**
 * Handles the discovery, parsing, organization, and setup of documentation components.
 *
 * The `DocsHandler` class is responsible for scanning the documentation directory,
 * parsing all documentation files, and organizing them into a nested object structure
 * that mirrors the folder hierarchy. It also provides access to the parsed documentation
 * components and their metadata for rendering or further processing.
 *
 * Usage:
 * ```ts
 * const handler = new DocsHandler();
 * const docs = handler.docs;
 * ```
 */
export class DocsHandler {
	public docs: Record<string, any>;

	constructor() {
		this.docs = this.handle();
	}

	/**
	 * While the naming scheme of this method is kind-of uffed-scay
	 * Basically this runs all the methods below to not only find, but parse, sort, and setup
	 * all the doc components
	 */
	public handle() {
		const parsedDocs = this.findAll();

		const root: Record<string, any> = {};
		for (const entry of parsedDocs) {
			// Remove leading slash and split path
			const parts = entry.path.replace(/^\/?src\/lib\/docs\//, '').split('/');
			let current = root;

			for (let i = 0; i < parts.length; i++) {
				const part = parts[i];
				const isLast = i === parts.length - 1;
                                
				// If it's a +page.svx file, use 'root' as the key
				if (isLast && part === '+page.svx') {
					current['root'] = entry;
				} else if (isLast) {
					// If it's another file, use the file name (without extension) as the key
					const fileKey = part.replace(/\.[^/.]+$/, '');
					current[fileKey] = entry;
				} else {
					// Folder: create if not exists
					if (!current[part]) current[part] = {};
					current = current[part];
				}
			}
		}

		return root;
	}

	/**
	 * Finds all the available documentation files, then uses the mdsvex pre-processor to convert
	 * them into render-able components before being passed through and casted to `DocComponent`
	 *
	 * @returns A list of doc components that can be rendered
	 */
	public findAll(): DocComponent[] {
		const imported_docs = import.meta.glob('@doc/**/**/*.{md,svx}', { eager: true });

		const parsedDocs = Object.entries(imported_docs).map(([path, module]) => {
			return {
				path,
				component: (module as unknown as ImportedComponent).default,
				metadata: (module as unknown as ImportedComponent).metadata
			};
		});

		return parsedDocs;
	}
}
