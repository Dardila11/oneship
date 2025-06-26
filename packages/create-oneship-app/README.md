# `create-oneship-app`

A command-line interface (CLI) tool to bootstrap a new Next.js application with a curated set of features, getting you from idea to production faster.

## Overview

`create-oneship-app` is an interactive CLI that scaffolds a new Next.js project. It allows you to seamlessly integrate common tools and libraries from the start, saving you hours of configuration.

## Features

This tool can configure the following features for your project:

- **Styling**:
  - [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework for rapid UI development.
- **Component Library**:
  - [Shadcn UI](https://ui.shadcn.com/): Beautifully designed, accessible components that you can copy and paste into your apps.
- **Authentication**:
  - **BetterAuth**: A custom, lightweight authentication solution.
  - [Clerk](https://clerk.com/): A complete user management platform.
  - [NextAuth.js](https://next-auth.js.org/): An open-source authentication solution for Next.js.
- **Database ORM**:
  - [Drizzle ORM](https://orm.drizzle.team/): A TypeScript-native ORM that gives you SQL-like syntax.
- **Internationalization**:
  - [next-intl](https://next-intl-docs.vercel.app/): A library for internationalization (i18n) in Next.js.

## Usage

To create a new OneShip project, run the following command in your terminal:

```bash
npx create-oneship-app
```

The CLI will guide you through a series of questions to configure your project based on the features listed above.

## Development

If you want to contribute to the development of `create-oneship-app` itself, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd packages/create-oneship-app
    ```
3.  **Install dependencies using pnpm:**
    ```bash
    pnpm install
    ```
4.  **Build the project:**
    The project uses TypeScript. You need to compile it to JavaScript to run it.
    ```bash
    pnpm build
    ```
5.  **Run in watch mode (optional):**
    To automatically rebuild the project when you make changes, run:
    ```bash
    pnpm dev
    ```
6.  **Run the local CLI:**
    To test your local changes, you can link the package globally:
    ```bash
    pnpm link --global
    ```
    And then run it from any directory:
    ```bash
    create-oneship-app
    ```

## Project Structure

- `_templates/`: Contains the [Hygen](https://www.hygen.io/) templates used for code generation and scaffolding.
- `src/`: The TypeScript source code for the CLI.
  - `index.ts`: The main entry point of the application.
  - `cli.ts`: Defines the command-line interface using `commander`.
  - `prompts.ts`: Contains the interactive prompts presented to the user.
  - `features.ts`: Logic for installing and configuring the different features.
  - `scaffold.ts`: Orchestrates the project scaffolding process.
  - `utils/`: Utility functions used throughout the application.
- `package.json`: Project metadata, scripts, and dependencies.
- `tsconfig.json`: TypeScript configuration.
