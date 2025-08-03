# Suggested Commands

## Development Commands

### Interactive Development (Recommended)
```bash
make pv
```
- Interactive directory selection using fzf
- Automatically navigates to slide project and starts dev server
- Opens slide presentation in browser

### Manual Development
```bash
cd {slide-project}/src
pnpm run dev
```
- Start development server for specific slide project
- Opens slide presentation in browser with live reload

## Build and Export Commands

### Build Slides for Production
```bash
cd {slide-project}/src
pnpm run build
```
- Builds slides for production deployment
- Output goes to configured directory

### Export to PDF
```bash
cd {slide-project}/src
pnpm run export
```
- Exports slides to PDF format
- Uses Playwright for rendering

## Package Management

### Install Dependencies
```bash
pnpm install
```
- Install all dependencies across workspace

### Add Workspace Dependencies
```bash
pnpm i -w -D {package-name}
```
- Add development dependencies to workspace root

## Code Quality Commands

### Format Code
```bash
pnpm prettier --write .
```
- Format all files using Prettier with Slidev plugin

### Lint Markdown
```bash
markdownlint **/*.md
```
- Lint markdown files according to project configuration

## Project Management

### Create New Slide Project
```bash
mkdir slide-name
cd slide-name
pnpm create slidev@latest
```
- Creates new Slidev project in subdirectory
- Follow README.md instructions for workspace integration