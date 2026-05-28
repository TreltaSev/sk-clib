import { copyFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(new URL('..', import.meta.url).pathname);
const source = resolve(root, 'packages/sk-clib/src/lib/theme/types.js');
const target = resolve(root, 'packages/sk-clib/dist/theme/types.js');

if (!existsSync(source)) {
	throw new Error(`Missing source theme types file: ${source}`);
}

copyFileSync(source, target);
