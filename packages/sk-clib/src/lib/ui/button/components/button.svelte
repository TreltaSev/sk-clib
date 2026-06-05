<script lang="ts">
	// --- Logic ---
	import { cn } from '@utils/classname';
	import type { Props } from '..';

	let { children, class: className = $bindable(undefined), buttonClass = $bindable('px-4 py-2 rounded-md bg-[var(--color-primary)] color-[var(--color-white)] w-fit'), href, ...rest }: Props = $props();
	
	// Setup Button's Default Class
	let buttonCls = $state(cn(buttonClass, className));
	$effect(() => {
		buttonCls = cn(buttonClass, className);
	});
</script>

{#if href}
	<a {href} class={cn(buttonCls)} {...(rest as any)} tabindex="0">
		{@render children?.()}
	</a>
{:else}
	<button class={cn(buttonCls)} {...(rest as any)} tabindex="0">
		{@render children?.()}
	</button>
{/if}

<!--@component
    # Button Component
    Simple button component for easy customization and easy onclick functionality
	Button is easily configured, colored, and will also abide to WCAG standards.
	@public
-->
