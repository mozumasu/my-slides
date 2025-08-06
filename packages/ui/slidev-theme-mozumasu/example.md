---
theme: ./
colorSchema: light
fonts:
  sans: "Noto Sans JP"
  serif: "Robot Slab"
  mono: "Fira Code"
css: unocss
---

# Ocean & Neon Theme Demo

🌊 Beautiful animated backgrounds for Slidev

<div class="pt-12">
  <span @click="next" class="px-2 p-1 rounded cursor-pointer hover:bg-white hover:bg-opacity-10">
    Press Space for next page <carbon:arrow-right class="inline"/>
  </span>
</div>

<div class="absolute bottom-10 left-10">
  <div class="text-sm opacity-50">
    Press <kbd class="tab-key">T</kbd> to toggle themes | <kbd class="tab-key">W</kbd> for wave styles
  </div>
</div>

<style>
/* Ocean title effects - blue glow for h1 */
h1 {
  color: #00bfff;
  text-shadow:
    0 0 1px #00bfff,
    0 0 15px #00bfff,
    0 0 8px #4dd0e1,
    0 0 25px #4dd0e1;
  font-weight: 300;
  letter-spacing: 1px;
}

/* Enhanced code blocks */
.slidev-code {
  background: rgba(15, 23, 42, 0.4) !important;
  backdrop-filter: blur(12px);
  border: 1px solid rgba(100, 116, 139, 0.2);
}

/* Tab key styling */
.tab-key {
  display: inline-block;
  background: rgba(139, 92, 246, 0.2);
  color: #a78bfa;
  padding: 4px 12px;
  border-radius: 8px;
  border: 1px solid rgba(139, 92, 246, 0.3);
  font-family: "Fira Code", monospace;
  font-size: 0.75em;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0 4px;
}
</style>

---

# Theme Features

<div class="grid grid-cols-2 gap-8 mt-8">
  <div>
    <h3 class="text-xl mb-4">🌊 Ocean Theme</h3>
    <ul class="space-y-2">
      <li>Realistic water animation with Three.js</li>
      <li>Sun sparkles and foam effects</li>
      <li>Three wave styles:
        <ul class="ml-4 mt-1">
          <li>• Tropical (bright blue)</li>
          <li>• Natural (realistic)</li>
          <li>• Deep (dark ocean)</li>
        </ul>
      </li>
    </ul>
  </div>
  <div>
    <h3 class="text-xl mb-4">⚡ Neon Theme</h3>
    <ul class="space-y-2">
      <li>Dynamic polygon animations</li>
      <li>Purple, blue & magenta gradients</li>
      <li>Morphing shapes on slide change</li>
      <li>Cyberpunk aesthetic</li>
    </ul>
  </div>
</div>

<div class="absolute bottom-10 text-center w-full">
  <p class="text-sm opacity-70">
    Try pressing <kbd class="tab-key">T</kbd> now to see the magic! ✨
  </p>
</div>

---

# What is Slidev?

Slidev is a slide maker and presentation tool designed for developers. It includes the following features:

- 📝 **Text-based** - focus on your content with Markdown, then style it later
- 🎨 **Themable** - themes can be shared and reused as npm packages
- 🧑‍💻 **Developer Friendly** - code highlighting, live coding with autocompletion
- 🤹 **Interactive** - embed Vue components to enhance your expressions
- 🎥 **Recording** - built-in recording and camera view
- 📤 **Portable** - export to PDF, PPTX, PNGs, or even a hostable SPA
- 🛠 **Hackable** - virtually anything that's possible on a webpage is possible in Slidev

<br>
<br>

Read more about [Why Slidev?](https://sli.dev/guide/why)

---

# Navigation

Hover on the bottom-left corner to see the navigation's controls panel

## Keyboard Shortcuts

|     |     |
| --- | --- |
| <kbd>space</kbd> / <kbd>tab</kbd> / <kbd>right</kbd> | next animation or slide |
| <kbd>left</kbd>  / <kbd>shift</kbd><kbd>space</kbd> | previous animation or slide |
| <kbd>up</kbd> | previous slide |
| <kbd>down</kbd> | next slide |

---
layout: image-right
image: https://cover.sli.dev
---

# Code

Use code snippets and get the highlighting directly!

```ts
interface User {
  id: number
  firstName: string
  lastName: string
  role: string
}

function updateUser(id: number, update: Partial<User>) {
  const user = getUser(id)
  const newUser = { ...user, ...update }
  saveUser(id, newUser)
}
```

---
layout: center
class: "text-center"
---

# Learn More

[Documentation](https://sli.dev) / [GitHub Repo](https://github.com/slidevjs/slidev)
