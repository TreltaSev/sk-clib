<script>
	import { Header } from "@lib";
	let { children, title = $bindable('Not given a title :(') } = $props();
</script>

<Header xl>{title}</Header>

{@render children?.()}
