<script lang="ts">
	// --- Components ---
	import { Frame } from 'sk-clib';
	import { DocsHandler } from '@doc/handler';

	// --- Logic ---
	import "@lib/prism.js"
	import "@lib/prism.css"
	import DocTree from '@lib/docs/DocTree.svelte';

	const handler = new DocsHandler();
	const docs = handler.docs;
</script>

<Frame fill class="grid grid-cols-[20%_1fr_20%]">
	<Frame fill class="col-start-2">
		<DocTree node={docs}/>
	</Frame>
</Frame>
