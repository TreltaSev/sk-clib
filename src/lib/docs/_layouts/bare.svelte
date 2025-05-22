<script>
	import { Header } from "@lib";
	let { children, title = $bindable('Not given a title :(') } = $props();
</script>


<Header xl class="mt-5">{title}</Header>

{@render children?.()}
