.PHONY: help dev blog slides slide-select new-slide build clean install format lint type-check status

# デフォルトターゲット（ヘルプ表示）
help:
	@echo "🚀 Turborepo Portfolio Commands"
	@echo ""
	@echo "📖 Development:"
	@echo "  make dev           - 全プロジェクト同時開発"
	@echo "  make blog          - ブログ開発"
	@echo "  make slides        - 全スライド開発"
	@echo "  make slide-select  - スライド選択開発（fzf）"
	@echo "  make new-slide [NAME=<name>] - 新しいスライドプロジェクト作成"
	@echo ""
	@echo "🔨 Build & Deploy:"
	@echo "  make build         - 全プロジェクトビルド"
	@echo "  make export        - スライドPDF出力"
	@echo ""
	@echo "🧹 Maintenance:"
	@echo "  make install       - 依存関係インストール"
	@echo "  make clean         - キャッシュ・ビルド成果物削除"
	@echo "  make format        - コード整形"
	@echo "  make lint          - リント実行"
	@echo "  make type-check    - 型チェック"
	@echo "  make status        - プロジェクト状況確認"

# 開発コマンド
dev:
	@echo "🚀 Starting all projects..."
	pnpm turbo dev

blog:
	@echo "📝 Starting blog development..."
	pnpm turbo dev --filter=blog

slides:
	@echo "🎬 Starting all slides development..."
	pnpm turbo dev --filter=./apps/slides/*

slide-select:
	@echo "🎯 Select a slide project:"
	@selected_slide=$$(ls apps/slides/ | fzf --prompt="Select slide project: " --height=10); \
	if [ -n "$$selected_slide" ]; then \
		echo "Starting development for: $$selected_slide"; \
		pnpm turbo dev --filter=slides-$$selected_slide; \
	else \
		echo "No slide project selected"; \
	fi

new-slide:
	@project_name="$(NAME)"; \
	if [ -z "$$project_name" ]; then \
		echo "🎯 新しいスライドプロジェクトを作成します"; \
		echo -n "プロジェクト名を入力してください: "; \
		read project_name; \
		if [ -z "$$project_name" ]; then \
			echo "❌ プロジェクト名が入力されませんでした"; \
			exit 1; \
		fi; \
	fi; \
	if [ -d "apps/slides/$$project_name" ]; then \
		echo "❌ プロジェクト 'apps/slides/$$project_name' は既に存在します"; \
		exit 1; \
	fi; \
	echo "🚀 新しいスライドプロジェクト '$$project_name' を作成中..."; \
	mkdir -p apps/slides/$$project_name; \
	echo '{\n  "name": "slides-'$$project_name'",\n  "type": "module",\n  "private": true,\n  "scripts": {\n    "build": "slidev build",\n    "dev": "slidev --open",\n    "export": "slidev export"\n  },\n  "devDependencies": {\n    "@slidev/cli": "^0.50.0-beta.6",\n    "@slidev/theme-default": "^0.25.0",\n    "@slidev/theme-seriph": "^0.25.0",\n    "vue": "^3.5.12"\n  }\n}' > apps/slides/$$project_name/package.json; \
	echo '---\n# try also "default" to start simple\ntheme: seriph\n# random image from a curated Unsplash collection by Anthony\n# like them? see https://unsplash.com/collections/94734566/slidev\nbackground: https://cover.sli.dev/1920x1080\n# some information about your slides, markdown enabled\ntitle: '$$project_name'\ninfo: |\n  ## Slidev Starter Template\n  Presentation slides for developers.\n\n  Learn more at [Sli.dev](https://sli.dev)\n# apply any unocss classes to the current slide\nclass: text-center\n# https://sli.dev/custom/highlighters.html\nhighlighter: shiki\n# https://sli.dev/guide/drawing\ndrawings:\n  enabled: true\n  persist: false\n# slide transition: https://sli.dev/guide/animations#slide-transitions\ntransition: slide-left\n# enable MDC Syntax: https://sli.dev/guide/syntax.html#mdc-syntax\nmdc: true\n---\n\n# '$$project_name'\n\nPresentation slides for developers\n\n<div class="pt-12">\n  <span @click="$$nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">\n    Press Space for next page <kbd>space</kbd>\n  </span>\n</div>\n\n<div class="abs-br m-6 flex gap-2">\n  <button @click="$$nav.openInEditor()" title="Open in Editor" class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-white">\n    <carbon:edit />\n  </button>\n  <a href="https://github.com/slidevjs/slidev" target="_blank" alt="GitHub" title="Open in GitHub"\n    class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-white">\n    <carbon-logo-github />\n  </a>\n</div>\n\n<!--\nThe last comment block of each slide will be treated as slide notes. It will be visible and editable in Presenter Mode along with the slide. [Read more in the docs](https://sli.dev/guide/syntax.html#notes)\n-->\n\n---\ntransition: fade-out\n---\n\n# What is Slidev?\n\nSlidev is a slides maker and presenter designed for developers, consist of the following features\n\n- 📝 **Text-based** - focus on the content with Markdown, and then style it later\n- 🎨 **Themable** - theme can be shared and used with npm packages\n- 🧑‍💻 **Developer Friendly** - code highlighting, live coding with autocompletion\n- 🤹 **Interactive** - embedding Vue components to enhance your expressions\n- 🎥 **Recording** - built-in recording and camera view\n- 📤 **Portable** - export into PDF, PNGs, or even a hostable SPA\n- 🛠 **Hackable** - anything possible on a webpage\n\n<br>\n<br>\n\nRead more about [Why Slidev?](https://sli.dev/guide/why)\n\n<!--\nYou can have `style` tag in markdown to override the style for the current page.\nLearn more: https://sli.dev/guide/syntax#embedded-styles\n-->\n\n<style>\nh1 {\n  background-color: #2B90B6;\n  background-image: linear-gradient(45deg, #4EC5D4 10%, #146b8c 20%);\n  background-size: 100%;\n  -webkit-background-clip: text;\n  -moz-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  -moz-text-fill-color: transparent;\n}\n</style>\n\n---\n\n# Navigation\n\nHover on the bottom-left corner to see the navigation controls panel, [learn more](https://sli.dev/guide/navigation.html)\n\n## Keyboard Shortcuts\n\n|     |     |\n| --- | --- |\n| <kbd>right</kbd> / <kbd>space</kbd> | next animation or slide |\n| <kbd>left</kbd>  / <kbd>shift</kbd><kbd>space</kbd> | previous animation or slide |\n| <kbd>up</kbd> | previous slide |\n| <kbd>down</kbd> | next slide |\n\n<!-- https://sli.dev/guide/animations.html#click-animations -->\n<img\n  v-click\n  class="absolute -bottom-9 -left-7 w-80 opacity-50"\n  src="https://sli.dev/assets/arrow-bottom-left.svg"\n  alt=""\n/>\n<p v-after class="absolute bottom-23 left-45 opacity-30 transform -rotate-10">Here!</p>\n\n---\nlayout: image-right\nimage: https://cover.sli.dev\n---\n\n# Code\n\nUse code snippets and get the highlighting directly![^1]\n\n```ts {all|2|1-6|9|all}\ninterface User {\n  id: number\n  firstName: string\n  lastName: string\n  role: string\n}\n\nfunction updateUser(id: number, update: User) {\n  const user = getUser(id)\n  const newUser = { ...user, ...update }\n  saveUser(id, newUser)\n}\n```\n\n<arrow v-click="[3, 4]" x1="400" y1="420" x2="230" y2="330" color="#564" width="3" arrowSize="1" />\n\n[^1]: [Learn More](https://sli.dev/guide/syntax.html#line-highlighting)\n\n<style>\n.footnotes-sep {\n  @apply mt-20 opacity-10;\n}\n.footnotes {\n  @apply text-sm opacity-75;\n}\n.footnote-backref {\n  display: none;\n}\n</style>\n\n---\n\n# Components\n\n<div grid="~ cols-2 gap-4">\n<div>\n\nYou can use Vue components directly inside your slides.\n\nWe have provided a few built-in components like `<Tweet/>` and `<Youtube/>` that you can use directly. And adding your custom components is also super easy.\n\n```html\n<Counter :count="10" />\n```\n\n<!-- ./components/Counter.vue -->\n<Counter :count="10" m="t-4" />\n\nCheck out [the guides](https://sli.dev/builtin/components.html) for more.\n\n</div>\n<div>\n\n```html\n<Tweet id="1390115482657726468" />\n```\n\n<Tweet id="1390115482657726468" scale="0.65" />\n\n</div>\n</div>\n\n<!--\nPresenter note with **bold**, *italic*, and ~~striked~~ text.\n\nAlso, HTML elements are valid:\n<div class="flex w-full">\n  <span style="flex-grow: 1;">Left content</span>\n  <span>Right content</span>\n</div>\n-->\n\n---\nclass: px-20\n---\n\n# Themes\n\nSlidev comes with powerful theming support. Themes can provide styles, layouts, components, or even configurations for tools. Switching between themes by just **one edit** in your frontmatter:\n\n<div grid="~ cols-2 gap-2" m="t-2">\n\n```yaml\n---\ntheme: default\n---\n```\n\n```yaml\n---\ntheme: seriph\n---\n```\n\n<img border="rounded" src="https://github.com/slidevjs/themes/blob/main/screenshots/theme-default/01.png?raw=true" alt="">\n\n<img border="rounded" src="https://github.com/slidevjs/themes/blob/main/screenshots/theme-seriph/01.png?raw=true" alt="">\n\n</div>\n\nRead more about [How to use a theme](https://sli.dev/themes/use.html) and\ncheck out the [Awesome Themes Gallery](https://sli.dev/themes/gallery.html).\n\n---\n\n# Clicks Animations\n\nYou can add `v-click` to elements to add a click animation.\n\n<div v-click>\n\nThis shows up when you click the slide:\n\n```html\n<div v-click>\n  This shows up when you click the slide:\n</div>\n```\n\n</div>\n\n<br>\n\n<v-click>\n\nThe <code>v-click</code> directive also accepts a number that controls the order of when the element will appear:\n\n```html\n<div v-click="3">Last</div>\n<div v-click="1">First</div>\n<div v-click="2">Second</div>\n```\n\n</v-click>\n\n<div class="mt-12">\n  <div v-click="3" class="text-xl p-2">Last</div>\n  <div v-click="1" class="text-xl p-2">First</div>\n  <div v-click="2" class="text-xl p-2">Second</div>\n</div>\n\n<br>\n\n<v-click>\n\nLearn more in the [clicks animations guide](https://sli.dev/guide/animations.html#click-animations).\n\n</v-click>\n\n---\n\n# Learn More\n\n[Documentations](https://sli.dev) · [GitHub](https://github.com/slidevjs/slidev) · [Showcases](https://sli.dev/showcases.html)\n' > apps/slides/$$project_name/slides.md; \
	echo "📦 依存関係をインストール中..."; \
	cd apps/slides/$$project_name && pnpm install; \
	echo "✅ スライドプロジェクト '$$project_name' が正常に作成されました!"; \
	echo ""; \
	echo "🚀 開始するには:"; \
	echo "  make slide-select  # または"; \
	echo "  pnpm turbo dev --filter=slides-$$project_name"

# ビルド・デプロイ
build:
	@echo "🔨 Building all projects..."
	pnpm turbo build

export:
	@echo "📄 Exporting slides to PDF..."
	pnpm turbo export --filter=./apps/slides/*

# メンテナンス
install:
	@echo "📦 Installing dependencies..."
	pnpm install

clean:
	@echo "🧹 Cleaning cache and build artifacts..."
	pnpm turbo clean
	rm -rf node_modules/.cache
	rm -rf apps/*/dist
	rm -rf apps/*/.astro

format:
	@echo "✨ Formatting code..."
	pnpm turbo format

lint:
	@echo "🔍 Running lint..."
	pnpm turbo lint

type-check:
	@echo "📋 Running type check..."
	pnpm turbo type-check

status:
	@echo "📊 Project Status:"
	@echo ""
	@echo "Workspace packages:"
	@pnpm list --depth=0 -r
	@echo ""
	@echo "Git status:"
	@git status --short
