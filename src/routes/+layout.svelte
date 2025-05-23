<script lang="ts">
	import '../app.css';

	// --- Components ---
	import { Frame, Flex } from '@lib';

	// --- Icons ---
	import IconGithub from '~icons/mdi/github';
	import IconNpm from '~icons/mdi/npm';

	let { children } = $props();
</script>

<Flex col class="mb-20 w-full overflow-y-auto scroll-smooth">
	<Frame flex col fill class="h-fit text-white/80">
		<!-- Navigation Bar -->
		<Flex row fillw centerx class="bg-surface-0 h-12 shrink-0 gap-4 px-[20%]">
			<a href="/" class="whitespace-nowrap">sk-clib</a>
			<Frame fill />
			<a href="https://github.com/TreltaSev/sk-clib" target="_blank">
				<IconGithub class="size-6 shrink-0 text-white/40 duration-200 hover:text-white/100" />
			</a>
			<a href="https://www.npmjs.com/package/sk-clib" target="_blank">
				<IconNpm class="size-6 shrink-0 text-white/40 duration-200 hover:text-white/100" />
			</a>
		</Flex>

		<!-- Content -->
		<Flex col fill class="px-[20%]">
			{@render children()}
		</Flex>
	</Frame>
</Flex>
