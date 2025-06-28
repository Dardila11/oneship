# create-oneship-app

The simplest way to start a new Oneship project.

This package is a lightweight wrapper for the `create` command in the main `@oneship/cli` tool. Its purpose is to provide the standard `npx create-oneship-app` command that developers expect.

## Usage

To create a new project, run the following command in your terminal:

```bash
npx create-oneship-app my-new-project
```

You can also use the shorter `npm init` command:

```bash
npm init oneship-app my-new-project
```

This will create a new directory called `my-new-project` and scaffold a new OneShip application inside it.

## Options

You can pass options directly to the command to skip the interactive prompts:

```bash
npx create-oneship-app my-app --tailwind --drizzle --shadcn
```

All available options correspond to the features you can add to your project:

- `--tailwind`: Enable Tailwind CSS
- `--drizzle`: Enable Drizzle ORM
- `--shadcn`: Enable Shadcn UI
- `--next-auth`: Enable NextAuth.js
- `--internationalization`: Enable Internationalization

For more advanced project management, please refer to the main [`@oneship/cli`](../cli/README.md) package.

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
  - [next-intl](https://next-intl.dev/): A library for internationalization (i18n) in Next.js.

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
