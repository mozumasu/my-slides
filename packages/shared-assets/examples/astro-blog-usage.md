# Astroブログでの共有アセット使用例

## 1. パッケージのインストール

```bash
cd apps/blog
pnpm add @mozumasu/shared-assets
```

## 2. Astroコンポーネントでの使用

```astro
---
// components/AuthorCard.astro
import { ASSETS } from '@mozumasu/shared-assets';

export interface Props {
  name: string;
  bio: string;
}

const { name, bio } = Astro.props;
---

<div class="author-card">
  <img 
    src={ASSETS.images.avatars.mozumasu} 
    alt={name}
    class="author-avatar" 
  />
  <div class="author-info">
    <h3>{name}</h3>
    <p>{bio}</p>
    <div class="social-links">
      <a href="https://github.com/mozumasu">
        <img src={ASSETS.images.common.icons.github} alt="GitHub" />
      </a>
      <a href="https://twitter.com/mozumasu">
        <img src={ASSETS.images.common.icons.twitter} alt="Twitter" />
      </a>
    </div>
  </div>
</div>
```

## 3. ブログ記事のフロントマターで使用

```markdown
---
// src/pages/posts/my-post.md
title: "技術ブログの記事"
author: "mozumasu"
thumbnail: ASSETS.images.blog.thumbnails.techPost
publishDate: "2025-01-01"
---

# 記事タイトル

記事内容...

![アーキテクチャ図](ASSETS.images.slides.diagrams.architecture)
```

## 4. レイアウトでの使用

```astro
---
// layouts/BlogLayout.astro
import { ASSETS } from '@mozumasu/shared-assets';

export interface Props {
  title: string;
  thumbnail?: string;
}

const { title, thumbnail } = Astro.props;
const ogImage = thumbnail || ASSETS.images.blog.thumbnails.default;
---

<html lang="ja">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>{title}</title>
  
  <!-- OGP画像 -->
  <meta property="og:image" content={ogImage} />
  <meta property="og:title" content={title} />
  
  <!-- ファビコン -->
  <link rel="icon" href={ASSETS.images.logos.personal} />
</head>
<body>
  <slot />
</body>
</html>
```

## 5. 動的画像生成（Astro Image）

```astro
---
// components/OptimizedImage.astro
import { Image } from 'astro:assets';
import { ASSETS } from '@mozumasu/shared-assets';

export interface Props {
  assetPath: string;
  alt: string;
  width?: number;
  height?: number;
}

const { assetPath, alt, width = 800, height = 600 } = Astro.props;
---

<Image 
  src={assetPath}
  alt={alt}
  width={width}
  height={height}
  format="webp"
  quality={80}
/>
```

```astro
<!-- 使用例 -->
<OptimizedImage 
  assetPath={ASSETS.images.blog.posts.myArticle}
  alt="記事画像"
  width={800}
  height={400}
/>
```

## 6. コンテンツコレクションでの型安全使用

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';
import { ASSETS } from '@mozumasu/shared-assets';

const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    thumbnail: z.string().optional(),
    author: z.string(),
    publishDate: z.date(),
    tags: z.array(z.string()).optional(),
  })
});

export const collections = {
  blog: blogCollection,
};

// 使用例でのバリデーション
const validThumbnail = ASSETS.images.blog.thumbnails.techPost;
```

## 7. Astro統合での一括設定

```typescript
// integrations/shared-assets.ts
import type { AstroIntegration } from 'astro';
import { ASSETS } from '@mozumasu/shared-assets';

export default function sharedAssetsIntegration(): AstroIntegration {
  return {
    name: 'shared-assets',
    hooks: {
      'astro:config:setup': ({ updateConfig, injectScript }) => {
        // グローバルにアセットを注入
        injectScript('page', `window.ASSETS = ${JSON.stringify(ASSETS)};`);
      },
    },
  };
}
```

```typescript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import sharedAssetsIntegration from './integrations/shared-assets';

export default defineConfig({
  integrations: [
    sharedAssetsIntegration(),
  ],
});
```

## 8. 記事一覧での使用

```astro
---
// pages/blog/index.astro
import { getCollection } from 'astro:content';
import { ASSETS } from '@mozumasu/shared-assets';

const posts = await getCollection('blog');
---

<div class="blog-grid">
  {posts.map((post) => (
    <article class="blog-card">
      <img 
        src={post.data.thumbnail || ASSETS.images.blog.thumbnails.default}
        alt={post.data.title}
        class="thumbnail"
      />
      <h2>{post.data.title}</h2>
      <p>by {post.data.author}</p>
    </article>
  ))}
</div>
```