# 🗂️ Project Structure

A recommended project structure for the modular CLI toolkit, designed for extensibility, modularity, and a plugin ecosystem.

```text
root/
├── cli/                # CLI entry point and command definitions (Commander.js or CAC)
│   ├── commands/       # Individual CLI commands (init, add, generate, deploy, etc.)
│   ├── prompts/        # Interactive CLI prompts and utilities
│   └── index.ts        # Main CLI bootstrap
│
├── core/               # Core framework logic and shared utilities
│   ├── config/         # Config loading, validation, and schema
│   ├── module-system/  # Plugin/module loader, lifecycle, and registry
│   ├── scaffolder/     # File/code generation engine
│   └── index.ts        # Core exports
│
├── features/           # Built-in features (auth, db, env, ui, etc.)
│   ├── auth/           # Auth integrations (Clerk, Auth.js, etc.)
│   ├── db/             # Database integrations (Prisma, Drizzle, etc.)
│   ├── env/            # Environment variable management
│   ├── ui/             # UI system integrations (shadcn/ui, Radix, etc.)
│   └── ...             # Other core features
│
├── plugins/            # User and community plugins (external or local)
│   ├── registry/       # Plugin discovery and metadata
│   └── ...             # Plugin implementations
│
├── templates/          # File/code templates for scaffolding (TS, JSX, route handlers, etc.)
│   ├── components/     # UI/component templates
│   ├── pages/          # Page/route templates
│   └── ...
│
├── docs/               # Documentation (auto-generated and markdown)
│
├── scripts/            # Dev and build scripts (optional)
│
├── tests/              # Unit and integration tests
│
├── toolkit.config.ts   # Unified project config (for CLI and modules)
├── package.json        # Project manifest and CLI entry
├── README.md           # Project overview and usage
└── ...                 # Other root files (e.g., .gitignore, tsconfig.json)
```

## Directory Descriptions

- **cli/**: All CLI logic, commands, and user interaction.
- **core/**: Core framework, config, module/plugin system, and scaffolding engine.
- **features/**: Official, built-in modules for common features (auth, db, env, ui, etc.).
- **plugins/**: Third-party or user-created plugins, with a registry for discovery.
- **templates/**: All code/file templates for scaffolding new files and features.
- **docs/**: Documentation for users and contributors.
- **scripts/**: Helper scripts for development, build, or release (optional).
- **tests/**: All test suites for CLI, core, features, and plugins.
- **toolkit.config.ts**: Main config file for project and module settings.

This structure supports modularity, extensibility, and a healthy plugin ecosystem, while keeping core logic and features organized and maintainable.
