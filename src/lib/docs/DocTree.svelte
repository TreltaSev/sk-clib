<script lang="ts">
	import { Flex, Header } from '@lib/ui';
	import { onMount } from 'svelte';

	type DocNode = {
		root?: {
			metadata?: {
				order?: number;
				title?: string;
			};
			component?: typeof import('svelte').SvelteComponent;
		};
		component?: typeof import('svelte').SvelteComponent;
		[key: string]: any;
	};

	export let node: DocNode;

	/**
	 * Sorts the children of a documentation node by their `order` metadata.
	 */
	function getSortedDocs(obj: Record<string, any>) {
		return Object.entries(obj)
			.filter(([key]) => key !== 'root')
			.sort(([, a], [, b]) => {
				const orderA = a?.root?.metadata?.order ?? a?.metadata?.order ?? 9999;
				const orderB = b?.root?.metadata?.order ?? b?.metadata?.order ?? 9999;
				return orderA - orderB;
			});
	}

	onMount(() => {
		console.log('Rendering node:', node);
	});
</script>

{#if node.root}
	<Header xxl class="font-4xl">{node.root?.metadata?.title}</Header>
{/if}

{#each getSortedDocs(node) as [key, value]}
	{#if value.root?.component}
		<svelte:component this={value.root.component} />
	{:else if value.component}
		<svelte:component this={value.component} />
	{/if}

	{#each Object.entries(value).filter(([k]) => k !== 'root') as [subKey, subValue]}
		{#if typeof subValue === 'object' && subValue !== null && 'component' in subValue}
			<!-- Render actual doc file -->
			<svelte:component this={(subValue as DocNode).component} />
		{:else if typeof subValue === 'object' && !['metadata'].includes(subKey)}
			<!-- Recurse into folder-like object -->
			<svelte:self node={subValue} />
		{:else}
			<!-- Not valid doc node -->
		{/if}
	{/each}
{/each}
