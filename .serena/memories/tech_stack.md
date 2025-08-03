# Tech Stack

## Core Technologies
- **Slidev** (`@slidev/cli`): Presentation framework based on Vue.js
- **Vue.js** (`vue`): Frontend framework for slide components
- **TypeScript**: Used in configuration files (`vite.config.ts`)
- **Vite**: Build tool and development server
- **PNPM**: Package manager (version 9.12.2)

## Development Tools
- **Prettier** with `prettier-plugin-slidev`: Code formatting for slide files
- **Markdownlint**: Markdown linting with comprehensive configuration
- **Playwright Chromium**: For slide export functionality

## Slidev Themes
- `@slidev/theme-default`: Default Slidev theme
- `@slidev/theme-seriph`: Alternative theme
- `slidev-theme-mozumasu`: Custom theme (local)

## Package Management
- Uses PNPM workspaces for monorepo structure
- Shared dependencies at root level
- Individual slide projects in `*/src` directories
- Package manager specified as `pnpm@9.12.2`

## Build System
- Vite configuration for custom build settings
- Shared build output directory (`./dist`)
- Custom build paths for individual slide projects