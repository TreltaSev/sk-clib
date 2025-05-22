<script lang="ts">
	// --- Components ---
	import { Header } from '@lib';
    import DocTree from "./DocTree.svelte"

	// --- Logic ---
	import type { HTMLAttributes } from 'svelte/elements';

	export type DocNode = {
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


	export type tProps = HTMLAttributes<HTMLDivElement> & {
		node: DocNode,
        prev?: string,
	}

	let { children, node, prev = $bindable(''), ...rest }: tProps | any = $props();
</script>

{#if node.root}
	<Header xxl class="font-4xl">{node.root?.metadata?.title}</Header>
{/if}

{#each getSortedDocs(node) as [key, value]}
	{#if value.root?.component}
        <value.root.component prev={`${prev}${key ? '/' : ''}${key}`}/>
	{:else if value.component}
        <value.component prev={`${prev}${key ? '/' : ''}${key}`}/>
	{/if}

	{#each Object.entries(value).filter(([k]) => k !== 'root') as [subKey, subValue]}
		{#if typeof subValue === 'object' && subValue !== null && 'component' in subValue}
			<!-- Render actual doc file -->
			{@const SubComponent = subValue.component as any}
            <SubComponent prev={`${prev}${subKey ? '/' : ''}${subKey}`}/>
		{:else if typeof subValue === 'object' && !['metadata'].includes(subKey)}
			<!-- Recurse into folder-like object -->
            <DocTree prev={`${prev}${subKey ? '/' : ''}${subKey}`} node={subValue}/>
		{:else}
			<!-- Not valid doc node -->
		{/if}
	{/each}
{/each}
