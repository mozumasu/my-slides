# 🚀 Personal Portfolio

> ブログとスライドのポートフォリオサイト powered by Astro & Slidev

[![Turborepo](https://img.shields.io/badge/built%20with-Turborepo-cc00ff.svg)](https://turbo.build/)
[![Astro](https://img.shields.io/badge/built%20with-Astro-ff5d01.svg)](https://astro.build/)
[![Slidev](https://img.shields.io/badge/built%20with-Slidev-1e293b.svg)](https://sli.dev/)

## ✨ 特徴

- **📝 ブログ**: Astro製のモダンSPA
- **🎬 スライド**: Slidev製のインタラクティブプレゼンテーション
- **⚡ Turborepo**: 高速並列ビルド・開発
- **🎨 統一設計**: Tailwind CSS + Biome
- **🔄 共通コンポーネント**: モノレポによる効率的な開発

## 🏗️ プロジェクト構造

```
my-portfolio/
├── apps/
│   ├── blog/                 # Astroブログ
│   └── slides/               # Slidevプレゼンテーション
│       ├── 202501-lt/        # 2025年LT
│       ├── infra-beginner/   # インフラ初心者向け
│       └── favorite-oss/     # お気に入りOSS
├── packages/
│   ├── config/               # 共通設定（Tailwind、Biome）
│   ├── ui/                   # 共通UIコンポーネント
│   └── lib/                  # 共通ライブラリ
├── turbo.json                # Turborepo設定
├── makefile                  # 開発コマンド
└── pnpm-workspace.yaml       # ワークスペース設定
```

## 🛠️ 技術スタック

### フロントエンド
- **[Astro](https://astro.build/)** - 静的サイトジェネレーター
- **[Slidev](https://sli.dev/)** - プレゼンテーションフレームワーク
- **[Vue.js](https://vuejs.org/)** - UIコンポーネント
- **[Tailwind CSS](https://tailwindcss.com/)** - スタイリング

### 開発環境
- **[Turborepo](https://turbo.build/)** - モノレポ管理・高速ビルド
- **[pnpm](https://pnpm.io/)** - パッケージマネージャー
- **[Biome](https://biomejs.dev/)** - リント・フォーマット
- **[TypeScript](https://www.typescriptlang.org/)** - 型安全性

### デプロイ
- **[Cloudflare Workers](https://workers.cloudflare.com/)** - ホスティング
- **[Cloudflare Registrar](https://www.cloudflare.com/products/registrar/)** - ドメイン管理

## 🚀 セットアップ

### 必要環境
- Node.js 18+
- pnpm 9+
- fzf (スライド選択用、オプション)

### インストール

```bash
# リポジトリをクローン
git clone <repository-url>
cd my-portfolio

# 依存関係をインストール
make install
# または
pnpm install
```

## 💻 開発コマンド

### 基本コマンド

```bash
# ヘルプ表示
make

# 全プロジェクト同時開発
make dev

# ブログ開発
make blog

# 全スライド開発
make slides

# スライド選択開発（fzf）
make slide-select
```

### ビルド・デプロイ

```bash
# 全プロジェクトビルド
make build

# スライドPDF出力
make export
```

### メンテナンス

```bash
# 依存関係インストール
make install

# キャッシュ・ビルド成果物削除
make clean

# コード整形
make format

# リント実行
make lint

# 型チェック
make type-check

# プロジェクト状況確認
make status
```

## 📝 コンテンツ作成

### 新しいブログ記事

```bash
# ブログ開発環境起動
make blog

# apps/blog/src/pages/ に記事を追加
```

### 新しいスライド

```bash
# apps/slides/ ディレクトリに移動
cd apps/slides

# 新しいスライドプロジェクト作成
mkdir my-new-slide
cd my-new-slide

# package.jsonを作成
cat > package.json << 'EOF'
{
  "name": "slides-my-new-slide",
  "type": "module",
  "private": true,
  "scripts": {
    "build": "slidev build",
    "dev": "slidev --open",
    "export": "slidev export"
  },
  "devDependencies": {
    "@slidev/cli": "^0.50.0-beta.6",
    "@slidev/theme-default": "^0.25.0",
    "@slidev/theme-seriph": "^0.25.0",
    "vue": "^3.5.12"
  }
}
EOF

# slides.mdを作成してスライド内容を記述
```

## 🎨 スタイル設定

### Tailwind CSS
共通のTailwind設定は `packages/config/tailwind.config.js` にあります。

### Biome（フォーマット・リント）
設定は `packages/config/biome.json` で一元管理されています。

### カスタムテーマ
Slidevのカスタムテーマは `packages/ui/slidev-theme-mozumasu/` にあります。

## 🚢 デプロイ

### Cloudflare Workers

```bash
# ビルド
make build

# デプロイ（Wranglerが設定済みの場合）
pnpm wrangler deploy
```

## 📚 参考リンク

- [Astro Documentation](https://docs.astro.build/)
- [Slidev Documentation](https://sli.dev/)
- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)

## 📄 ライセンス

MIT License
