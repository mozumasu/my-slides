# slidev-theme-mozumasu

[![NPM version](https://img.shields.io/npm/v/slidev-theme-mozumasu?color=3AB9D4&label=)](https://www.npmjs.com/package/slidev-theme-mozumasu)

Ocean & Neon themed [Slidev](https://github.com/slidevjs/slidev) theme with animated backgrounds.

## Features

- 🌊 **Ocean theme** with realistic water animation using Three.js
- ⚡ **Neon theme** with dynamic polygon animations
- 🎨 **Multiple wave styles** (Tropical, Natural, Deep)
- ⌨️ **Keyboard shortcuts** for theme switching
- 📱 **Responsive design**
- 🎯 **Smooth transitions** between themes

## Install

### For workspace projects

1. Add to your `package.json`:

```json
{
  "devDependencies": {
    "slidev-theme-mozumasu": "file:../../../packages/ui/slidev-theme-mozumasu"
  },
  "dependencies": {
    "three": "^0.179.1"
  }
}
```

2. Create `global-bottom.vue` in your project root:

```vue
<script setup lang="ts">
// Re-export from theme
import GlobalBottom from 'slidev-theme-mozumasu/components/global-bottom.vue'
</script>

<template>
  <GlobalBottom theme="ocean" />
</template>
```

3. Update your `slides.md` frontmatter:

```yaml
---
theme: mozumasu
---
```

### For external projects

Add the following frontmatter to your `slides.md`. Start Slidev then it will prompt you to install the theme automatically.

<pre><code>---
theme: <b>mozumasu</b>
---</code></pre>

Learn more about [how to use a theme](https://sli.dev/guide/theme-addon#use-theme).

## Configuration

Add to your `slides.md` frontmatter:

```yaml
---
theme: mozumasu
colorSchema: light
fonts:
  sans: "Noto Sans JP"
  serif: "Robot Slab"
  mono: "Fira Code"
css: unocss
---
```

## Keyboard Shortcuts

- **`T`** - Toggle between Ocean and Neon themes
- **`W`** - Switch wave styles (Ocean theme only: Tropical → Natural → Deep)

## Themes

### Ocean Theme
Realistic ocean waves with sun sparkles and foam effects.

Wave styles:
- **Tropical**: Bright blue waters with intense sun reflections
- **Natural**: Realistic ocean colors with moderate effects  
- **Deep**: Dark ocean with subtle effects

### Neon Theme
Dynamic polygon animations with purple, blue, and magenta gradients.

## Layouts

This theme extends the default Slidev layouts with ocean/neon backgrounds applied globally.

## Components

### GlobalBottom
The main component that provides the animated backgrounds. It's automatically included when using this theme.

## Customization

Add custom styles to your slides:

```css
/* Ocean title effects - blue glow */
h1 {
  color: #00bfff;
  text-shadow:
    0 0 1px #00bfff,
    0 0 15px #00bfff,
    0 0 8px #4dd0e1,
    0 0 25px #4dd0e1;
}

/* Enhanced code blocks */
.slidev-code {
  background: rgba(15, 23, 42, 0.4) !important;
  backdrop-filter: blur(12px);
  border: 1px solid rgba(100, 116, 139, 0.2);
}
```

## Contributing

- `npm install`
- `npm run dev` to start theme preview of `example.md`
- Edit the `example.md` and style to see the changes
- `npm run export` to generate the preview PDF
- `npm run screenshot` to generate the preview PNG
