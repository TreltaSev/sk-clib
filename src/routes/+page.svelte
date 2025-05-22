<script lang="ts">
	// --- Components ---
	import { Flex, Header } from '@lib';
	import { DocsHandler } from '@doc/handler';

	// --- Logic ---
	import "@lib/prism.js"
	import "@lib/prism.css"
	import DocTree from '@lib/docs/DocTree.svelte';

	const handler = new DocsHandler();
	const docs = handler.docs;

	// Abide to the order of the doc object
	function getSortedDocs(obj: Record<string, any>) {
		return Object.entries(obj)
			.filter(([key]) => key !== 'root')
			.sort(([, a], [, b]) => {
				const order_a = a?.root?.metadata?.order ?? a?.metadata?.order ?? 9999;
				const order_b = b?.root?.metadata?.order ?? b?.metadata?.order ?? 9999;
				return order_a - order_b;
			});
	}
</script>

{#if docs.root}
	<Header xxl class="font-4xl">{docs.root.metadata.title} as</Header>
{/if}

<DocTree node={docs}/>


<!-- 
{#each getSortedDocs(docs) as [key, value]}
	<Flex col class="gap-5">
		{#if value.root}
			<Flex col class="gap-0">
				<svelte:component this={value.root.component} />
			</Flex>
		{/if}

		<Flex col class="gap-0">
			{#each getSortedDocs(value) as [sub_key, sub_value]}
				{#if sub_value.root}
					<svelte:component this={sub_value.root.component} />
				{:else}
					<svelte:component this={sub_value.component} />
				{/if}
			{/each}
		</Flex>
	</Flex>
{/each}
-->