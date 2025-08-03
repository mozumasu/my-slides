# Development Utilities

## Makefile Utilities

### Interactive Project Selector (`make pv`)
```bash
make pv
```
- Uses `fzf` for interactive directory selection
- Filters out `node_modules` and `dist` directories
- Automatically navigates to `src/` subdirectory
- Starts development server with `pnpm run dev`
- Opens slide presentation in browser

## System Commands (macOS/Darwin)

### File Operations
- `ls -d */` - List directories
- `find` - Find files and directories
- `grep` - Search text patterns
- `sed` - Stream editor for filtering and transforming text

### Package Management
- `pnpm` - Primary package manager
- `pnpm install` - Install dependencies
- `pnpm run {script}` - Run package scripts
- `pnpm create slidev@latest` - Create new Slidev project

### Development Tools
- `fzf` - Fuzzy finder (used in makefile)
- `prettier` - Code formatter
- `markdownlint` - Markdown linter

## Workspace Configuration

### PNPM Workspace
- Defined in `pnpm-workspace.yaml`
- Includes all `*/src` directories as packages
- Shared dependencies at root level
- Monorepo structure for multiple slide projects

### Vite Configuration
- Global build configuration in `vite.config.ts`
- Custom output directory (`./dist`)
- Build optimization settings
- Shared across all slide projects

## Browser Integration
- Development server automatically opens browser
- Live reload functionality
- Hot module replacement for Vue components
- Real-time slide preview during development