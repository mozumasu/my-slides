# スライド管理レポジトリ

<https://ja.sli.dev/guide/>
<https://zenn.dev/jy8752/articles/ad565a43ba0e0a>

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
