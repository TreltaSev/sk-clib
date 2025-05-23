<script lang="ts">
	import '../app.css';

	// --- Components ---
	import { Frame, Flex } from '@lib';

	let { children } = $props();
</script>



<Flex col class="overflow-y-auto w-full scroll-smooth mb-20">
	<Frame flex col fill class="text-white/80 h-fit">

		<!-- Navigation Bar -->
		<Flex row fillw centerx class="bg-surface-0 h-12 shrink-0 px-[20%]">
			<a href="/">sk-clib</a>
		</Flex>

		<!-- Content -->
		<Flex col fill class="px-[20%]">
			{@render children()}
		</Flex>
	</Frame>
</Flex>


