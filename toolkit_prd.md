# 📄 Product Requirements Document (PRD)

## 📌 Project Title

**[Name TBD – e.g., ForgeKit, FrameCLI, Modulr]**

## 🧭 1. Purpose

This project is a **developer-centric CLI toolkit and extensible framework** for building and deploying modern web apps.  
It is **not a boilerplate**, but a **modular and customizable toolkit** that gives developers freedom to scaffold and configure projects on their terms — including authentication, database, state management, and deployment.

## 👥 2. Target Audience

- Frontend and fullstack developers (intermediate to advanced)
- Dev teams building SaaS, internal tools, AI apps
- Developers who value modularity and flexibility
- Devs using Next.js, TypeScript, and React as their base stack
- Developers who want to automate project setup without being locked in

## 🎯 3. Goals & Non-Goals

### ✅ Goals

- Provide a CLI interface to scaffold features (`npx devcli add auth`)
- Support choice of tools and libraries (e.g., Clerk vs Auth.js)
- Generate project structure, boilerplate, and typesafe code
- Plugin system for extending CLI behavior
- Automate setup of `.env`, routing, API endpoints, DB configs, etc.
- Prioritize great DX (developer experience)

### ❌ Non-Goals

- Not a template or boilerplate starter kit
- Not tightly coupled to a backend or DB
- Not GUI-focused — CLI-first only (at least initially)

## 🔧 4. Core Features

| Feature                   | Description                                                 |
| ------------------------- | ----------------------------------------------------------- |
| **CLI Interface**         | `npx devcli [command]` with flags for library/tool choices  |
| **Modular Plugin System** | Add features like `auth`, `db`, `env`, `ui`, `ai`, `cms`    |
| **Auth Integrations**     | Support Clerk, Auth.js, Supabase Auth, etc.                 |
| **Database Integrations** | Prisma, Drizzle, Supabase with config and schema generation |
| **State Management**      | Zustand, Redux Toolkit, etc. (optional)                     |
| **Env Management**        | Inject `.env` variables and expose typed access in code     |
| **Scaffolding**           | Create pages, components, API routes, hooks, config         |
| **Custom Recipes**        | Community/shared plugin modules (e.g., `stripe-checkout`)   |
| **Extensibility**         | Devs can create CLI plugins (`.devcli/plugin.ts`)           |
| **UI Layer (Optional)**   | Support adding design systems (e.g., `shadcn/ui`)           |

## 🏗️ 5. Architecture Overview

- /cli → CLI logic (Commander.js or CAC)
- /core → Core framework logic and shared utils
- /features → Built-in features like auth, db, env, ui
- /plugins → User or community-contributed plugins
- /templates → File scaffolds (TS, JSX, route handlers, etc.)
- docs/ → Auto-generated and markdown docs
- package.json → CLI entry point

## 📦 6. Example CLI Commands

```bash
npx oneship init
npx oneship add auth --using=next-auth
npx oneship add db --using=prisma
npx oneship generate component button
npx oneship deploy
```

## ⚙️ 7. Tech Stack

- Core Stack: Node.js, TypeScript, Commander.js or CAC
- Target Project Stack: Next.js, React, TypeScript, Tailwind (optional)
- Plugin System: File exports or plugin folder-based
- Templating: EJS, Handlebars, or tagged literals
- Monorepo Tooling (optional): Turborepo or PNPM Workspaces

## 📈 8. Milestones & Phases

Phase 1 – MVP (Weeks 1–4)

- init, add auth, add db, add env
- Auth.js and Clerk integrations
- Prisma or Drizzle integration
- File scaffolding + simple plugin logic

Phase 2 – Plugin Ecosystem (Weeks 5–8)

- Custom plugin API
- Recipe registry for community features
- Support vector DBs, CMS, AI APIs
- deploy command (e.g., Vercel, Fly.io)

Phase 3 – Polish & Ecosystem Growth (Weeks 9+)

- Plugin validation and testing
- Full docs + website
- UI integrations (shadcn, Radix, etc.)
- (Optional) Web-based GUI

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
