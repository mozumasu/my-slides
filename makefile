.PHONY: help dev blog slides slide-select build clean install format lint type-check status

# デフォルトターゲット（ヘルプ表示）
help:
	@echo "🚀 Turborepo Portfolio Commands"
	@echo ""
	@echo "📖 Development:"
	@echo "  make dev           - 全プロジェクト同時開発"
	@echo "  make blog          - ブログ開発"
	@echo "  make slides        - 全スライド開発"
	@echo "  make slide-select  - スライド選択開発（fzf）"
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
