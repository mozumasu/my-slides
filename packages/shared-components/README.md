# Shared Components

スライドで共通利用するVueコンポーネント集

## 🎯 概要

複数のスライドプロジェクトで再利用可能なコンポーネントを提供します。テーマ自動検出機能により、NeonとOceanテーマに自動対応します。

## 📦 インストール

```bash
# スライドプロジェクトで
pnpm add @mozumasu/shared-components
```

## 🧩 コンポーネント一覧

### SelfIntroduction

スタイルの異なる自己紹介スライドコンポーネント

#### 特徴
- **テーマ自動検出**: NeonとOceanテーマを自動判別
- **アニメーション**: 滑らかな入場エフェクト
- **レスポンシブ**: モバイル対応
- **カスタマイズ可能**: コンパクトモード対応

#### Props

```typescript
interface Props {
  theme?: 'neon' | 'ocean' | 'auto';  // テーマ指定（デフォルト: 'auto'）
  showAnimation?: boolean;             // アニメーション有効（デフォルト: true）
  compact?: boolean;                   // コンパクトモード（デフォルト: false）
}
```

## 🚀 使用方法

### 1. Slidevでの基本使用

```markdown
---
layout: center
---

<SelfIntroduction />
```

### 2. テーマ指定

```markdown
---
layout: center
---

<!-- Neonテーマ強制 -->
<SelfIntroduction theme="neon" />

<!-- Oceanテーマ強制 -->
<SelfIntroduction theme="ocean" />
```

### 3. Vueコンポーネントとして使用

```vue
<script setup lang="ts">
import { SelfIntroduction } from '@mozumasu/shared-components';
</script>

<template>
  <div class="slide">
    <!-- 基本使用 -->
    <SelfIntroduction />
    
    <!-- カスタマイズ -->
    <SelfIntroduction 
      theme="neon" 
      :show-animation="false" 
      compact 
    />
  </div>
</template>
```

### 4. グローバルコンポーネント登録

```typescript
// setup/main.ts
import { createApp } from 'vue';
import { SelfIntroduction } from '@mozumasu/shared-components';

export default {
  install(app: App) {
    app.component('SelfIntroduction', SelfIntroduction);
  }
}
```

### 5. 複数スライドでの使用例

```markdown
<!-- slides.md -->

---
layout: center
---

# はじめに

<SelfIntroduction compact />

---
layout: center
---

# 詳細な自己紹介

<SelfIntroduction />

---
```

## 🎨 テーマデザイン

### Neonテーマ
- **背景**: 黒ベースにグラデーション
- **アクセント**: 明るいグリーン (`#00ff41`)
- **エフェクト**: グロー効果、ネオンライト風
- **雰囲気**: サイバーパンク、未来的

### Oceanテーマ  
- **背景**: 明るいブルーグラデーション
- **アクセント**: スカイブルー (`#0ea5e9`)
- **エフェクト**: 清涼感、透明感
- **雰囲気**: 爽やか、自然

## 📱 レスポンシブ対応

- **デスクトップ**: フル機能表示
- **タブレット**: 適切なサイズ調整
- **モバイル**: コンパクト表示、縦積みレイアウト

## ⚡ パフォーマンス

- **軽量**: 必要最小限のCSS
- **最適化**: Vue 3 Composition API使用
- **遅延ロード**: アニメーション遅延で滑らかな表示

## 🔧 カスタマイズ

### CSS変数でのスタイル調整

```css
.self-introduction.theme-custom {
  --primary-text: #your-color;
  --accent-color: #your-accent;
  --bg-color: #your-background;
}
```

### アニメーション無効化

```vue
<SelfIntroduction :show-animation="false" />
```

### コンパクトモード

```vue
<SelfIntroduction compact />
```

## 🚀 今後の予定

- [ ] 他の共通コンポーネント追加
- [ ] より多くのテーマ対応
- [ ] カスタマイズ可能な内容
- [ ] 画像対応
- [ ] 国際化対応