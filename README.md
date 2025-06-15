# OneShip Monorepo

This is the monorepo for the OneShip CLI toolkit and framework.

## Structure

```
oneship/
├── packages/
│   ├── create-oneship-app/     # CLI to scaffold new projects
│   ├── cli/                    # Main CLI (e.g., `oneship add auth`)
│   ├── core/                   # Shared utilities and helpers
│   └── templates/              # Source for generating project and features
├── examples/                   # Sample apps
├── docs/                       # Documentation
├── package.json
├── turbo.json
├── tsconfig.json
└── README.md
```

## Getting Started

- Install dependencies: `pnpm install`
- Build all packages: `pnpm build`
- Run dev mode: `pnpm dev`

## Packages

- `create-oneship-app`: CLI to scaffold new projects
- `cli`: Main CLI for adding features
- `core`: Shared utilities
- `templates`: Project and feature templates
