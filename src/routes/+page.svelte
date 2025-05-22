<script lang="ts">
	// --- Components ---
	import { Flex, Header } from '@lib';
	import { DocsHandler } from '@doc/handler';

	const handler = new DocsHandler();
	const docs = handler.docs;

	// Abide to the order of the doc object
	function getSortedDocs(obj: Record<string, any>) {
		return Object.entries(obj)
			.filter(([key]) => key !== 'root')
			.sort(([, a], [, b]) => {
				console.log(a, b)
				const order_a = a?.root?.metadata?.order ?? a?.metadata?.order ?? 9999;
				const order_b = b?.root?.metadata?.order ?? b?.metadata?.order ?? 9999;
				return order_a - order_b;
			});
	}
</script>

{#if docs.root}
	<Header xxl>{docs.root.metadata.title}</Header>
{/if}

{#each getSortedDocs(docs) as [key, value]}
	<Flex col>
		{#if value.root}
			<Header md>{value.root.metadata.root} {key}</Header>
			<svelte:component this={value.root.component}/>
		{/if}

		<!-- Rendering Subfolders/files -->
		{#each getSortedDocs(value) as [sub_key, sub_value]}
			{#if sub_value.root}
				<svelte:component this={sub_value.root.component} />
			{:else}
				<svelte:component this={sub_value.component} />
			{/if}
		{/each}
	</Flex>
{/each}

