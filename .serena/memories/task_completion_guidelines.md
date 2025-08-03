# Task Completion Guidelines

## Before Task Completion

### Code Quality Checks
1. **Format code with Prettier**:
   ```bash
   pnpm prettier --write .
   ```

2. **Lint markdown files**:
   ```bash
   markdownlint **/*.md
   ```

3. **Test slide builds**:
   ```bash
   cd {slide-project}/src
   pnpm run build
   ```

### Verification Steps
- Ensure slides render correctly in development mode
- Verify build process completes without errors
- Check that exported PDFs generate properly if needed
- Confirm all new files follow naming conventions

## Development Workflow
1. Use `make pv` for interactive development
2. Make changes to slide content or components
3. Test in development server with live reload
4. Run formatting and linting before committing
5. Test build process to ensure production readiness

## Common Tasks

### Creating New Slides
1. Create project directory
2. Set up Slidev project in `src/` subdirectory
3. Move dependencies to root `package.json`
4. Update project-specific scripts for build/export paths
5. Test development and build processes

### Modifying Existing Slides
1. Navigate to project using `make pv` or manually
2. Edit slide content in `slides.md`
3. Add/modify components in `components/` directory
4. Test changes with `pnpm run dev`
5. Format and lint before completion

### Theme Development
1. Work in `slidev-theme-mozumasu/` directory
2. Follow Slidev theme development guidelines
3. Test theme with example slides
4. Ensure theme works across different slide projects

## No Testing Framework
- Project does not have automated testing configured
- Manual testing through development server is primary verification method
- Build process serves as basic validation