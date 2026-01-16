<script lang="ts">
	import { Flex } from "sk-clib";
	import DocTree from "./DocTree.svelte"
	import { onMount, type Component } from "svelte";

	let {children, node: nodes, ...rest} = $props();

	onMount(() => {
		console.log(nodes)
	})
</script>


<Flex col class="gap-20">
	{#each Object.entries(nodes) as [key, value]}
		{@debug value}
		<Flex col class="gap-5 bg-amber-200/20">

			<!-- Section -->
			{#if value.root?.component}
				{@const SectionComponent = value.root.component as Component}
				<SectionComponent/>
			{/if}

			<!-- Subsection -->
			{#each Object.entries(value).filter(([k]) => k !== 'root') as [subKey, subValue]}
				<Flex col class="gap-3 bg-blue-300/20">
					{@const SubsectionComponent = subValue.root.component}
					<SubsectionComponent/>
				</Flex>
			{/each}
		</Flex>
	{/each}
</Flex>