<script>
	import { Header } from 'sk-clib';
	let {
		children,
		title = $bindable('Not given a title :('),
		prev = $bindable(undefined)
	} = $props();
</script>

<a href={`#${prev}`}>
	<Header xxl class="mt-5" id={`${prev}`}>{title}</Header>
</a>

{@render children?.()}
