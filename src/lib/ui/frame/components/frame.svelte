<script lang="ts">
	// --- Logic ---
	import { cn, Tokenizer } from '@lib/utils';
	import type { Props } from '..';

	let {
		children,
		class: className,
		flex = $bindable(undefined),
		row = $bindable(undefined),
		col = $bindable(undefined),
		center = $bindable(undefined),
		centerx = $bindable(undefined),
		centery = $bindable(undefined),
		fill = $bindable(undefined),
		fillw = $bindable(undefined),
		fillh = $bindable(undefined),
		noshrink = $bindable(undefined),
		aspectSquare = $bindable(undefined),
		cursorAuto = $bindable(undefined),
		cursorDefault = $bindable(undefined),
		cursorPointer = $bindable(undefined),
		...rest
	}: Props = $props();

	const tokenInstance = new Tokenizer(className);


	function addTokenIf(statement: any, token: string) {
		if (statement === true) {
			className += ` ${token}`;
		}
	}

	// Flex Box
	tokenInstance.addTokenIf(flex, 'flex');
	tokenInstance.addTokenIf(row, 'flex-row');
	tokenInstance.addTokenIf(col, 'flex-col');

	// Positioning
	tokenInstance.addTokenIf(center, 'items-center justify-center');
	tokenInstance.addTokenIf(centerx, 'items-center');
	tokenInstance.addTokenIf(centery, 'justify-center');

	// Size Fillings
	tokenInstance.addTokenIf(fill, 'size-full');
	tokenInstance.addTokenIf(fillw, 'w-full');
	tokenInstance.addTokenIf(fillh, 'h-full');

	// Flex Config
	tokenInstance.addTokenIf(noshrink, 'shrink-0');

	// Aspect Ratios
	tokenInstance.addTokenIf(aspectSquare, 'aspect-square');

	// Cursor Options
	tokenInstance.addTokenIf(cursorAuto, 'cursor-auto');
	tokenInstance.addTokenIf(cursorDefault, 'cursor-default');
	tokenInstance.addTokenIf(cursorPointer, 'cursor-pointer');
</script>

<div class={cn(tokenInstance.className)} {...rest}>
	{@render children?.()}
</div>

<!--@component
    Generated by SvelteForge🔥 [Component Template]

    # Frame Component
    A simple wrapper for flexbox and other layout options.
    This component is a wrapper for the `div` element, with additional classes and properties to control layout and styling.
    It is designed to be used in conjunction with other components to create complex layouts.

    ## Usage
    ```svelte
    <Frame class="my-frame" flex row center fill>
        <ChildComponent />
    </Frame>
    ```

    This will create a flex container that is a row, centered, and fills the available space.
    The `class` prop can be used to add additional classes to the frame, and the `children` prop can be used to pass in child components.
-->
