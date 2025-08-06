# Slidevでの共有アセット使用例

## 1. パッケージのインストール

```bash
cd apps/slides/your-presentation
pnpm add @mozumasu/shared-assets
```

## 2. スライドでの基本使用

```markdown
---
theme: default
background: ASSETS.images.slides.backgrounds.ocean
---

# タイトルスライド

<img src="ASSETS.images.avatars.mozumasu" class="w-32 h-32 rounded-full" />

---

# アーキテクチャ図

<img src="ASSETS.images.slides.diagrams.architecture" alt="システム構成" />

---
```

## 3. Vueコンポーネント内での使用

```vue
<!-- components/ProfileCard.vue -->
<script setup lang="ts">
import { ASSETS } from '@mozumasu/shared-assets';

const props = defineProps<{
  name: string;
  role: string;
}>();
</script>

<template>
  <div class="profile-card">
    <img 
      :src="ASSETS.images.avatars.mozumasu" 
      :alt="props.name"
      class="avatar"
    />
    <h3>{{ props.name }}</h3>
    <p>{{ props.role }}</p>
    
    <div class="social-links">
      <a href="https://github.com/mozumasu">
        <img :src="ASSETS.images.common.icons.github" alt="GitHub" />
      </a>
      <a href="https://twitter.com/mozumasu">
        <img :src="ASSETS.images.common.icons.twitter" alt="Twitter" />
      </a>
    </div>
  </div>
</template>
```

## 4. グローバルコンポーネント登録

```typescript
// setup/main.ts
import { ASSETS } from '@mozumasu/shared-assets';

// Slidevのグローバル変数として登録
export default {
  install(app: App) {
    app.config.globalProperties.$assets = ASSETS;
  }
}
```

```markdown
<!-- スライド内で直接使用 -->
<img :src="$assets.images.avatars.mozumasu" alt="Profile" />
```

## 5. 背景画像の動的切り替え

```vue
<script setup lang="ts">
import { ASSETS } from '@mozumasu/shared-assets';
import { ref, computed } from 'vue';

const themes = ['ocean', 'tech'] as const;
const currentTheme = ref<typeof themes[number]>('ocean');

const backgroundImage = computed(() => {
  return ASSETS.images.slides.backgrounds[currentTheme.value];
});
</script>

<template>
  <div 
    class="slide-background" 
    :style="{ backgroundImage: `url(${backgroundImage})` }"
  >
    <slot />
  </div>
</template>
```

## 6. 型安全な画像パス管理

```typescript
// utils/images.ts
import { ASSETS, type SlideImagePath } from '@mozumasu/shared-assets';

export const getSlideImage = (category: keyof SlideImagePath, name: string) => {
  const categoryImages = ASSETS.images.slides[category];
  if (name in categoryImages) {
    return categoryImages[name as keyof typeof categoryImages];
  }
  throw new Error(`Image ${name} not found in category ${category}`);
};

// 使用例
const bgImage = getSlideImage('backgrounds', 'ocean');
```

## 7. 画像プリロード

```typescript
// composables/useImagePreload.ts
import { ASSETS } from '@mozumasu/shared-assets';

export const useImagePreload = (imagePaths: string[]) => {
  const preloadImages = () => {
    imagePaths.forEach(path => {
      const img = new Image();
      img.src = path;
    });
  };

  return { preloadImages };
};

// 使用例
const { preloadImages } = useImagePreload([
  ASSETS.images.avatars.mozumasu,
  ASSETS.images.slides.backgrounds.ocean,
  ASSETS.images.common.icons.github
]);

onMounted(() => {
  preloadImages();
});
```