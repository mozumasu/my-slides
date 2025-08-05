# Shared Assets

スライドとブログで共通利用する画像・アセット管理パッケージ

## 📁 ディレクトリ構造

```
packages/shared-assets/
├── images/
│   ├── avatars/          # プロフィール画像
│   ├── logos/            # ロゴ・ブランド画像
│   ├── slides/           # スライド専用画像
│   │   ├── backgrounds/  # 背景画像
│   │   ├── diagrams/     # 図表・ダイアグラム
│   │   └── screenshots/  # スクリーンショット
│   ├── blog/             # ブログ専用画像
│   │   ├── thumbnails/   # サムネイル
│   │   └── posts/        # 記事内画像
│   └── common/           # 共通画像
│       ├── icons/        # アイコン
│       └── patterns/     # パターン・テクスチャ
├── icons/                # アイコンフォント
└── fonts/                # Webフォント
```

## 🚀 使用方法

### 1. インストール

```bash
# プロジェクトルートで
pnpm add @mozumasu/shared-assets
```

### 2. 型安全な画像参照

```typescript
import { ASSETS } from '@mozumasu/shared-assets';

// スライドで使用
const backgroundImage = ASSETS.images.slides.backgrounds.ocean;

// ブログで使用  
const avatarImage = ASSETS.images.avatars.mozumasu;

// 共通アイコン
const githubIcon = ASSETS.images.common.icons.github;
```

### 3. Vue/Reactコンポーネントでの使用

```vue
<script setup lang="ts">
import { ASSETS } from '@mozumasu/shared-assets';
</script>

<template>
  <img :src="ASSETS.images.avatars.mozumasu" alt="Profile" />
  <img :src="ASSETS.images.common.icons.github" alt="GitHub" />
</template>
```

### 4. 環境別URL生成

```typescript
import { getFullAssetUrl, ASSETS } from '@mozumasu/shared-assets';

// 完全なURLを取得（本番環境のCDNなど）
const fullUrl = getFullAssetUrl(ASSETS.images.avatars.mozumasu);
```

## 📝 画像追加時の手順

1. **画像ファイルを配置**
   ```bash
   # 例：新しいアバター画像
   cp avatar-new.png packages/shared-assets/images/avatars/
   ```

2. **index.tsを更新**
   ```typescript
   avatars: {
     mozumasu: '/images/avatars/mozumasu.png',
     newAvatar: '/images/avatars/avatar-new.png', // 追加
   }
   ```

3. **ビルド**
   ```bash
   cd packages/shared-assets
   pnpm build
   ```

## 🎯 メリット

- **型安全性**: TypeScriptでパス間違いを防止
- **一元管理**: 全プロジェクトで同じ画像セットを共有
- **バージョン管理**: 画像の変更履歴を追跡
- **最適化**: ビルド時に画像最適化を実装可能
- **CDN対応**: 環境別のベースURL設定

## 🔧 高度な使用例

### 画像最適化との連携

```typescript
// 将来的な拡張: レスポンシブ画像
export const getResponsiveImage = (path: string, sizes: string[]) => {
  return sizes.map(size => ({
    src: `${path}?w=${size}`,
    width: size
  }));
};
```

### テーマ別画像管理

```typescript
export const getThemedAsset = (path: string, theme: 'light' | 'dark') => {
  return `${path}-${theme}`;
};
```