# PRD: `create-oneship-app`

- **Version:** 1.0
- **Status:** Drafting
- **Authors:** Daniel Ardila & OneShip AI Assistant

### 1.0 Overview & Goal

`create-oneship-app` is a command-line interface (CLI) tool for scaffolding new, production-ready Next.js projects.

The primary goal is to provide developers with a **fast and focused** starting point for modern web applications, particularly SaaS products. The tool prioritizes speed and developer experience by offering a curated set of best-practice options for core architectural decisions (UI, Authentication, Database). It aims to be the perfect balance between a minimal boilerplate and an overly-complex, kitchen-sink starter, setting the stage for further project evolution via `oneship add` commands.

### 2.0 Target Audience

- **Primary:** Developers building modern web applications and SaaS products on the Next.js framework.
- **Secondary:** Developers who value a quick, opinionated start but require the flexibility to customize and extend their project without being locked into a rigid structure.

### 3.0 Core Features & User Prompts

The CLI will be invoked via `npx create-oneship-app@latest <project-name>`. Upon execution, it will guide the user through a series of prompts to configure the initial project setup.

#### 3.1 UI & Styling

- **Prompt 1:** "Would you like to use Tailwind CSS for styling?" (Default: Yes)
- **Prompt 2 (Conditional):** If the user agrees to Tailwind, "Add Shadcn UI for your component library?" (Default: Yes)

#### 3.2 Authentication

- **Prompt 3:** "Select an Authentication provider:"
  - **Options:** Next-Auth, Clerk, Supabase Auth, Lucia, None.
  - **Goal:** Provide a curated list of popular, well-supported auth solutions.

#### 3.3 Database & ORM

- **Prompt 4:** "Select a Database ORM:"
  - **Options:** Drizzle, Prisma, None.
  - **Goal:** Offer the two most popular and powerful ORMs in the TypeScript/Next.js ecosystem.

### 4.0 CLI Functionality & Behavior

#### 4.1 Interaction Modes

The CLI must support two modes of operation:

1.  **Interactive Mode (Default):** When run with only a project name, the CLI enters an interactive session, asking the questions outlined in Section 3.0.
2.  **Flag-based Mode:** For automation and power-users, the CLI must allow bypassing prompts by providing command-line flags.
    - **Example:** `npx create-oneship-app my-app --shadcn --auth=clerk --orm=drizzle --db=postgres`

#### 4.2 Conditional Logic & User Guidance

- **Database Follow-up:** If a user selects "Drizzle" or "Prisma", the CLI **must** ask a follow-up question: "Choose your database type:".
  - **Options:** PostgreSQL, MySQL, SQLite.
- **Environment Variables:** Upon selecting an authentication provider, the CLI **must** generate a `.env.example` file containing the necessary placeholder environment variables (e.g., `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="..."`, `AUTH_SECRET="..."`). This provides clear, actionable guidance for the developer.

#### 4.3 Post-Generation Steps

Upon completing the prompts and scaffolding files, the CLI will automatically:

1.  Install all required `npm` dependencies.
2.  Initialize a new `git` repository.
3.  Display a "Success!" message summarizing the chosen stack and a "Next Steps" guide in the console.

### 5.0 Generated Project Structure

The tool will generate a standard Next.js App Router project with the following conventions for feature placement to ensure modularity and scalability.

- **`features/auth/`**: All authentication-related files, such as provider components, server-side configuration, and hooks, will be placed here.
- **`lib/db/`**: All database-related files, including the ORM schema (`schema.ts`), the client instance, and the configuration file (`drizzle.config.ts` or similar), will be located here.
- **`components/ui/`**: When Shadcn UI is selected, this directory will be created to hold the UI components.
- **Root Configuration:** Files like `tailwind.config.ts`, `postcss.config.js`, `next.config.mjs`, and `tsconfig.json` will reside in the project root as per standard conventions.

### 6.0 Non-Functional Requirements

- **Performance:** The end-to-end scaffolding process (from command execution to "Success!" message) should complete in under 60 seconds on a standard internet connection.
- **Clarity:** All user-facing output (prompts, summaries, errors) must be clear, concise, and easy to understand.
- **Extensibility:** The generated codebase must be structured to seamlessly integrate with future `oneship add` commands.

### 7.0 Out of Scope (for `create-oneship-app`)

The initial creation tool will remain focused. The following features will **not** be included in the initial setup but will be available via subsequent `oneship add` commands:

- Analytics Integration (PostHog, Vercel Analytics)
- Transactional Email (Resend, SendGrid)
- Billing & Subscriptions (Stripe, Lemon Squeezy)
- Deployment configurations (Vercel, Netlify)

### 8.0 Future Considerations

- **Template Expansion:** Introducing a `--template` flag to allow users to start from different pre-configured templates (e.g., `blog`, `saas-multitenant`).
- **Provider Growth:** Expanding the list of supported Authentication and Database providers based on community feedback and ecosystem trends.
- **Framework Support:** Exploring the possibility of supporting other frameworks like SvelteKit or Nuxt in the long term.
