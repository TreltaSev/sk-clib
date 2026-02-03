<script lang="ts">
	// --- Logic ---
	import { cn, Tokenizer } from '@lib/utils';
	import type { Props } from '..';

	let {
		children,
		class: className = $bindable(undefined),

		// Horizontal / Vertical
		horizontal = $bindable(undefined),
		vertical = $bindable(undefined),

		// Width / Height
		width = $bindable(undefined),
		height = $bindable(undefined),

		// Catch-alls
		...rest
	}: Props = $props();

	const tokenInstance = new Tokenizer(className);

	// Horizontal / Vertical
	tokenInstance.addTokenIf(horizontal || width, 'w-full');
	tokenInstance.addTokenIf(vertical || height, 'h-full');

	if ([horizontal, vertical, width, height].every((val) => val === undefined)) {
		tokenInstance.addTokenIf(true, 'size-full');
	}

</script>

<div class={cn(tokenInstance.className)} {...rest}>
	{@render children?.()}
</div>

<!--@component
    ---
    name: Spacer
    props:
        horizontal (undefined|boolean) = undefined: Expands the component to the most width it can occupy
        vertical (undefined|boolean) = undefined: Expands the component to the most height it can occupy
        width (undefined|boolean) = undefined: Expands the component to the most width it can occupy
        height (undefined|boolean) = undefined: Expands the component to the most height it can occupy
    ---
    
    Element that is soley made to fill in space. If nothing is passed, assumes 'size-full',
    otherwise, it fills the direction you tell it to.
-->
