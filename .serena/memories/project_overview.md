# Project Overview

## Purpose
This is a slide management repository for creating and managing presentation slides using Slidev (Slide + Vue). The project supports creating multiple slide presentations in a monorepo structure.

## Main Features
- Multiple slide presentations organized in separate directories
- Custom Slidev theme (`slidev-theme-mozumasu`)
- Shared dependencies across all slide projects
- Automated build and export functionality
- PDF export capability for presentations

## Project Structure
```
my-slides/
├── 202501-lt/          # Example slide project
│   └── src/            # Slide source files
├── slidev-theme-mozumasu/ # Custom Slidev theme
├── package.json        # Root package.json with shared dependencies
├── pnpm-workspace.yaml # Monorepo workspace configuration
├── makefile           # Development utilities
└── dist/              # Build output directory
```

## Key Technologies
- **Slidev**: Presentation framework using Vue.js and Vite
- **Vue.js**: Frontend framework for interactive slide components
- **PNPM**: Package manager with workspace support
- **Vite**: Build tool and development server
- **Playwright**: For PDF export functionality