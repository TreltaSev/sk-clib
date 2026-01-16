<script lang="ts">
	// --- Components ---
	import { Frame } from 'sk-clib';
	import { DocsHandler } from '@lib/docs/_handler';
	import { DocumentHierarchy } from "@lib/docs/types"

	// --- Logic ---
	import "@lib/prism.js"
	import "@lib/prism.css"
	import DocTree from '@lib/docs/DocTree.svelte';
	import { onMount } from 'svelte';

	const handler = new DocsHandler();
	const docs = handler.docs;

	onMount(() => {
		console.log(new DocumentHierarchy(docs).hierarchy)
	})
</script>

<Frame fill class="grid grid-cols-[20%_1fr_20%]">

	<!-- Table of Contents -->
	<Frame fill class="col-start-1">

	</Frame>

	<Frame fill class="col-start-2">
		<!-- <DocTree node={docs}/> -->
	</Frame>
</Frame>
