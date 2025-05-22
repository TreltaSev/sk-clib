<script lang="ts">
	// --- Components ---
	import { DocsHandler } from '@doc/handler';

	// --- Logic ---
	import "@lib/prism.js"
	import "@lib/prism.css"
	import DocTree from '@lib/docs/DocTree.svelte';

	const handler = new DocsHandler();
	const docs = handler.docs;
</script>

<DocTree node={docs}/>