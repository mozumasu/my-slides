# スライド管理レポジトリ

<https://ja.sli.dev/guide/>
<https://zenn.dev/jy8752/articles/ad565a43ba0e0a>

## 環境構築

### ルートディレクトリに`vite.config.ts`を作成

```ts:./vite.config.ts
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    emptyOutDir: false, // 出力ディレクトリを空にする
    outDir: "./dist", // 出力先ディレクトリを指定
  },
});
```

### ルートディレクトリのpackage.jsonにplaywrightを追加

```sh
pnpm i -w -D playwright-chromium
```

### prettierの設定

<https://github.com/slidevjs/prettier-plugin>

```sh
pnpm i -w -D prettier prettier-plugin-slidev
```

### リダイレクト設定

## スライド作成

```sh
mkdir slide-name
cd slide-name
# プロジェクトはsrcにする
pnpm create slidev@latest
```

ディレクトリ構成は以下のようになる

```sh
.
|-- slide-name
|   `-- src
|       |-- components
|       |   `-- Counter.vue
|       |-- pages
|       |   `-- imported-slides.md
|       |-- snippets
|       |   `-- external.ts
|       |-- .gitignore
|       |-- .npmrc
|       |-- README.md
|       |-- netlify.toml
|       |-- package.json
|       |-- slides.md
|       `-- vercel.json
|-- package.json
`-- pnpm-workspace.yaml
```

Slidevプロジェクトの`package.json`にある依存関係は他のスライドでも使用するため、ルートに移す

```diff json:./slide-name/package.json
{
  "name": "src",
  "type": "module",
  "private": true,
  "scripts": {
    "build": "slidev build",
    "dev": "slidev --open",
    "export": "slidev export"
  },
- "dependencies": {
-   "@slidev/cli": "^0.50.0-beta.6",
-   "@slidev/theme-default": "latest",
-   "@slidev/theme-seriph": "latest",
-   "vue": "^3.5.12"
- }
}
```

```diff json:./package.json
{
  "name": "my-slides",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "packageManager": "pnpm@9.12.2",
+ "dependencies": {
+   "@slidev/cli": "^0.50.0-beta.6",
+   "@slidev/theme-default": "latest",
+   "@slidev/theme-seriph": "latest",
+   "vue": "^3.5.12"
+ }
}
```

### ビルドとエクスポート

作成したSlidevプロジェクトのpackage.jsonにあるビルドとエクスポートのスクリプトを以下のように修正

```diff json:./slide-name/package.json
{
  "name": "src",
  "type": "module",
  "private": true,
  "scripts": {
-   "build": "slidev build",
    "dev": "slidev --open",
-   "export": "slidev export"
+   "build": "slidev build --base /slide-name/ --out ../../dist/slide-name",
+   "export": "slidev export --dark --output ../slide-name.pdf"
  }
}
```

## スライドテーマの作成

<https://ja.sli.dev/themes/write-a-theme.html>

```sh
pnpm create slidev-theme
```
