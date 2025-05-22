<script>
	import { Header } from '@lib';
	let {
		children,
		title = $bindable('Not given a title :('),
		prev = $bindable(undefined)
	} = $props();
</script>

<Header xl class="mt-5" id={`${prev}`}>{title}</Header>

{@render children?.()}
