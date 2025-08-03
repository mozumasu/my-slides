# Code Style and Conventions

## Project Structure Conventions
- Each slide project should be in its own directory
- Slide source files go in `{project-name}/src/` subdirectory
- Use `slides.md` as the main slide file
- Dependencies should be moved to root `package.json` for sharing

## Naming Conventions
- Slide project directories: Use kebab-case (e.g., `202501-lt`)
- Theme naming: Prefix with `slidev-theme-` (e.g., `slidev-theme-mozumasu`)
- Package names: Use lowercase with hyphens

## File Organization
```
slide-project/
├── src/
│   ├── slides.md          # Main slide content
│   ├── components/        # Vue components
│   ├── snippets/         # Code snippets
│   ├── images/           # Image assets
│   ├── package.json      # Project-specific config (minimal)
│   └── README.md         # Project documentation
```

## Prettier Configuration
- Slidev-specific formatting for `slides.md` and `pages/*.md`
- Uses `prettier-plugin-slidev` parser
- Configuration in `.prettierrc` at root level

## Markdownlint Rules
- Comprehensive markdown linting enabled
- Line length checking disabled (MD013: false)
- Multiple H1 headings allowed (MD025: false)
- Inline HTML allowed (MD033: false)
- Heading styles flexible (MD003: false)
- Configuration in `.markdownlint.yml`

## TypeScript/JavaScript Style
- ES modules (`"type": "module"`)
- Use TypeScript for configuration files
- Vite configuration pattern with defineConfig

## Package.json Structure
- Root level: Shared dependencies and workspace scripts
- Project level: Minimal scripts (dev, build, export)
- Use exact versions where specified
- Private packages for slide projects