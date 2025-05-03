# sk-clib

A flexible and modular component library built for my SvelteKit projects.

## 📦 Installation

```bash
bun install sk-clib
```

## 🔧 Usage

Once installed, you can import and use components like this:

```svelte
<script>
  import { Header, Text } from 'sk-clib';
</script>

<Header lg bold>Welp... Hi there :)</Header>
<Text size="lg" weight="bold">Hello World</Text>
```

If you're using path aliases, make sure to configure them properly in your `tsconfig.json` or `jsconfig.json`.

## 🛠 Development

To contribute or develop locally:

```bash
bun clone https://github.com/TreltaSev/sk-clib.git
cd sk-clib
bun install
bun run dev
```

This will launch the SvelteKit dev environment so you can view and test components live.

### Commands

* `npm run dev` – Start development server with live preview
* `npm run build` – Build the library for publishing
* `npm run lint` – Lint codebase
* `npm run check` – Run type checking
* `npm run test` – (If applicable) Run tests

## ✅ Publishing

Make sure everything builds correctly:

```bash
bun run build
```

Then publish:

```bash
bun publish
```

> Ensure your version is bumped and `package.json` is clean of any local dependencies before publishing.