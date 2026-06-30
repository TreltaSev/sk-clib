declare module 'sk-clib/ui' {
	import { Component } from "svelte";

	type AnyProps = Record<string, any>

	export class Button extends Component<AnyProps, any, any> {}
	export class Flex extends Component<AnyProps, any, any> {}
	export class Frame extends Component<AnyProps, any, any> {}
	export class Input extends Component<AnyProps, any, any> {}
	export class Spacer extends Component<AnyProps, any, any> {}
	export class Text extends Component<AnyProps, any, any> {}
}