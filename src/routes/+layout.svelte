<script lang="ts">
	import '../app.css';

	// --- Components ---
	import { Frame, Flex } from '@lib';

	let { children } = $props();
</script>

<!-- Navigation Bar -->

<Frame flex col fill class="bg-surface-2 text-white/80">
	<Flex row fillw centerx class="bg-surface-0 h-12 px-[20%]">
		<a href="/">sk-clib</a>
	</Flex>

	<Flex col fill class="px-[20%] mt-20" >
		{@render children()}
	</Flex>
</Frame>