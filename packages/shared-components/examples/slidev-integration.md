# Slidev統合ガイド

## 1. パッケージのインストール

```bash
cd apps/slides/your-presentation
pnpm add @mozumasu/shared-components
```

## 2. Slidevでの設定

### setup/main.tsで登録

```typescript
// setup/main.ts
import { defineAppSetup } from '@slidev/types'
import { SelfIntroduction } from '@mozumasu/shared-components'

export default defineAppSetup(({ app, router }) => {
  // グローバルコンポーネント登録
  app.component('SelfIntroduction', SelfIntroduction)
})
```

### 個別インポート方式

```vue
<!-- components/LocalSelfIntro.vue -->
<script setup lang="ts">
import { SelfIntroduction } from '@mozumasu/shared-components';
</script>

<template>
  <SelfIntroduction theme="ocean" />
</template>
```

## 3. スライドでの使用

### 基本使用

```markdown
---
layout: center
---

<SelfIntroduction />
```

### テーマ連携

```markdown
---
layout: center
theme: 'neon'
---

<!-- Neonテーマに自動適応 -->
<SelfIntroduction />

---
layout: center  
theme: 'ocean'
---

<!-- Oceanテーマに自動適応 -->
<SelfIntroduction />
```

### カスタマイズ使用

```markdown
---
layout: two-cols
---

# アジェンダ

1. 自己紹介
2. 技術スタック
3. 実績

::right::

<SelfIntroduction compact />
```

## 4. 現在のスライドに追加する例

### zeno-zshスライドの場合

```markdown
---
# slides.md
theme: default
background: https://cover.sli.dev
title: 'zeno.zshで始めるCLI無双'
info: |
  ## zeno.zsh CLI presentation
  Learn more at [zeno.zsh](https://github.com/yuki-yano/zeno.zsh)
class: text-center
drawings:
  persist: false
transition: slide-left
mdc: true
---

# zeno.zshで始める
# CLI無双

2025/08/07 ペチオプLT会

<SelfIntroduction compact />

---

# 自己紹介

<SelfIntroduction />

---

# 本日の内容

...
```

## 5. テーマカスタマイズ

### カスタムCSSの追加

```css
/* style.css */
.slidev-layout {
  --self-intro-accent: #your-color;
}

/* Neonテーマカスタム */
.theme-neon .self-introduction {
  --accent-color: #39ff14;
}

/* Oceanテーマカスタム */  
.theme-ocean .self-introduction {
  --accent-color: #00bcd4;
}
```

## 6. 動的テーマ切り替え

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { SelfIntroduction } from '@mozumasu/shared-components'

const currentTheme = ref<'neon' | 'ocean'>('ocean')

const toggleTheme = () => {
  currentTheme.value = currentTheme.value === 'neon' ? 'ocean' : 'neon'
}
</script>

<template>
  <div>
    <button @click="toggleTheme">
      テーマ切り替え: {{ currentTheme }}
    </button>
    <SelfIntroduction :theme="currentTheme" />
  </div>
</template>
```

## 7. 複数バリエーション

```markdown
---
layout: center
---

# フル自己紹介

<SelfIntroduction />

---
layout: two-cols
---

# コンパクト版

<SelfIntroduction compact />

::right::

# その他の内容

...

---
layout: center
---

# アニメーション無し

<SelfIntroduction :show-animation="false" />
```