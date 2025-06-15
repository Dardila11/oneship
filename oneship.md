# OneShip: Modular Framework & CLI Toolkit for Web App Development

## ✨ Project Goal

> OneShip is a **CLI toolkit + framework** that helps developers build and ship modern web apps quickly, without starting from a bloated boilerplate. It provides a customizable, opinionated architecture that can be extended using simple CLI commands.

## 📊 High-Level Features

- CLI to scaffold full Next.js projects with selected libraries (Tailwind, TypeScript, shadcn, etc.)
- Modular feature architecture (`features/` folder)
- Add integrations using commands like `oneship add auth`, `oneship add db`, `oneship add feature`.
- Automatically updates config, installs packages, and scaffolds files.

## 🏐 Monorepo Structure

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
└── README.md
```

## 📦 `create-oneship-app`

This is what runs when the dev types:

```bash
npx create-oneship-app@latest myapp
```

### Responsibilities:

- Prompt for preferences (JS/TS, Tailwind, shadcn, Auth, etc.)
- Scaffold from `packages/templates/base`
- Apply configuration
- Install deps + git init

## 📊 Template Project Structure

```bash
my-app/
├── app/                        # Next.js routing
│   ├── layout.tsx
│   └── page.tsx
├── features/                  # Modular feature folders
│   └── core/
│       ├── layout/
│       ├── components/
│       └── hooks/
├── public/
├── styles/
├── .env
├── next.config.js
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## ⚖️ OneShip CLI (`packages/cli`)

Commands available once project is created:

```bash
oneship add auth --using=next-auth
oneship add db --using=drizzle --database=postgres
oneship add env --key=DATABASE_URL --value=...
oneship add feature dashboard
```

### Example: `oneship add feature dashboard`

```bash
features/
└── dashboard/
    ├── components/
    ├── lib/
    └── hooks/
app/
└── dashboard/
    └── page.tsx  # if "isPage" selected
```

## ⚙️ CLI Stack

- `commander` – command routing
- `prompts` – interactive user input
- `fs-extra` – file operations
- `execa` – run terminal commands

## 🚀 Developer Workflow

```bash
# Step 1: Create project
npx create-oneship-app@latest myapp

# Prompts asked:
✔ JavaScript or TypeScript?
✔ Use TailwindCSS?
✔ Add Shadcn UI?
✔ Include Auth?

# Step 2: Go to project and run dev
cd myapp
pnpm dev

# Step 3: Add features
oneship add auth --using=clerk
oneship add db --using=drizzle
oneship add feature dashboard
```

## 🚜 Publishing Setup

- `create-oneship-app`: published as a binary
- `cli`: installed as a dev dependency in scaffolded project

```json
"bin": {
  "create-oneship-app": "dist/index.js"
}
```

Devs run:

```bash
npx create-oneship-app@latest myapp
npx oneship add feature dashboard
```

## ✅ Next Steps

1. Scaffold `packages/create-oneship-app`
2. Add base templates
3. Set up CLI with `commander`
4. Connect CLI to templates
5. Test CLI add-ons
6. Document everything
