# 📄 Product Requirements Document (PRD)

## 📌 Project Title

**OneShip: Modular Framework & CLI Toolkit for Web App Development**

## 🧭 1. Purpose

OneShip is a **developer-centric CLI toolkit and extensible framework** for building and deploying modern web apps. It is **not a boilerplate**, but a **modular and customizable toolkit** that gives developers freedom to scaffold and configure projects on their terms — including authentication, database, state management, and deployment. The goal is to help developers build and ship modern web apps quickly, without starting from a bloated boilerplate, using a customizable, opinionated architecture that can be extended via simple CLI commands.

## 👥 2. Target Audience

- Frontend and fullstack developers (intermediate to advanced)
- Dev teams building SaaS, internal tools, AI apps
- Developers who value modularity and flexibility
- Devs using Next.js, TypeScript, and React as their base stack
- Developers who want to automate project setup without being locked in

## 🎯 3. Goals & Non-Goals

### ✅ Goals

- Provide a CLI interface to scaffold features and integrations (`npx oneship add auth`)
- Support choice of tools and libraries (e.g., Clerk vs Auth.js, Prisma vs Drizzle)
- Generate project structure, boilerplate, and typesafe code
- Plugin system for extending CLI behavior
- Automate setup of `.env`, routing, API endpoints, DB configs, etc.
- Prioritize great DX (developer experience)
- Modular feature architecture (`features/` folder)
- Automatically update config, install packages, and scaffold files
- Community/shared plugin modules (recipes)

### ❌ Non-Goals

- Not a template or boilerplate starter kit
- Not tightly coupled to a backend or DB
- Not GUI-focused — CLI-first only (at least initially)
- Not a monolithic framework; extensibility and modularity are core

## 🔧 4. Core Features

| Feature                   | Description                                                 |
| ------------------------- | ----------------------------------------------------------- |
| **CLI Interface**         | `npx oneship [command]` with flags for library/tool choices |
| **Modular Plugin System** | Add features like `auth`, `db`, `env`, `ui`, `ai`, `cms`    |
| **Auth Integrations**     | Support Clerk, Auth.js, Supabase Auth, etc.                 |
| **Database Integrations** | Prisma, Drizzle, Supabase with config and schema generation |
| **State Management**      | Zustand, Redux Toolkit, etc. (optional)                     |
| **Env Management**        | Inject `.env` variables and expose typed access in code     |
| **Scaffolding**           | Create pages, components, API routes, hooks, config         |
| **Custom Recipes**        | Community/shared plugin modules (e.g., `stripe-checkout`)   |
| **Extensibility**         | Devs can create CLI plugins (`.oneship/plugin.ts`)          |
| **UI Layer (Optional)**   | Support adding design systems (e.g., `shadcn/ui`, Radix)    |
| **Monorepo Support**      | (Optional) Turborepo or PNPM Workspaces                     |

## 🏗️ 5. Architecture Overview

### Monorepo Structure

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

### Template Project Structure

```
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

## 📦 6. Example CLI Commands

```bash
npx create-oneship-app@latest myapp
npx oneship add auth --using=next-auth
npx oneship add db --using=prisma
npx oneship add feature dashboard
npx oneship deploy
```

### Command Details

- `oneship add auth --using=clerk`
- `oneship add db --using=drizzle --database=postgres`
- `oneship add env --key=DATABASE_URL --value=...`
- `oneship add feature dashboard`

## ⚙️ 7. Tech Stack

- **Core Stack:** Node.js, TypeScript, Commander.js or CAC
- **Target Project Stack:** Next.js, React, TypeScript, Tailwind (optional)
- **Plugin System:** File exports or plugin folder-based
- **Templating:** EJS, Handlebars, or tagged literals
- **Monorepo Tooling (optional):** Turborepo or PNPM Workspaces
- **CLI Dependencies:**
  - `commander` – command routing
  - `prompts` – interactive user input
  - `fs-extra` – file operations
  - `execa` – run terminal commands

## 📈 8. Milestones & Phases

**Phase 1 – MVP (Weeks 1–4)**

- init, add auth, add db, add env
- Auth.js and Clerk integrations
- Prisma or Drizzle integration
- File scaffolding + simple plugin logic

**Phase 2 – Plugin Ecosystem (Weeks 5–8)**

- Custom plugin API
- Recipe registry for community features
- Support vector DBs, CMS, AI APIs
- deploy command (e.g., Vercel, Fly.io)

**Phase 3 – Polish & Ecosystem Growth (Weeks 9+)**

- Plugin validation and testing
- Full docs + website
- UI integrations (shadcn, Radix, etc.)
- (Optional) Web-based GUI

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

## 📚 9. References / Inspirations

- shadcn/ui
- create-t3-app
- SST.dev
- Blitz.js
- Nx plugins
- Laravel Artisan CLI

## 💬 10. Open Questions

- Should scaffolding follow opinionated folder structures or remain unopinionated?
- Should we support monorepos by default?
- Will plugins be installed from npm, local, or a central registry?
- Do we include AI-specific templates in the core?
