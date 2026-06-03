/**
 * Converts a string like "test_string" or "test-string" to "testString"
 * @param s String to convert
 */
export function snakeOrKebabToCamel(s: string): string {
	return s.toLowerCase().replace(/([-_][a-z])/g, (group) =>
		group.toUpperCase().replace('-', '').replace('_', '')
	);
}

/**
 * Converts a snake_case string to kebab-case.
 *
 * Examples:
 * - "test_string" -> "test-string"
 * - "__Foo__Bar__" -> "foo-bar"
 * - "already-kebab" -> "already-kebab"
 *
 * @param s Input string in snake_case (or similar).
 * @returns The input converted to kebab-case (lowercased, underscores -> hyphens,
 *          consecutive underscores collapsed, and leading/trailing separators trimmed).
 */
export function snakeToKebab(s: string): string {
	if (!s) return s;
	// Replace one-or-more underscores with a single hyphen, then trim hyphens, then lowercase.
	return s
		.replace(/_+/g, '-')
		.replace(/^-+|-+$/g, '')
		.toLowerCase();
}

