# @oneship/core

This package is the internal engine for the OneShip ecosystem. It contains all the core business logic for scaffolding, configuring, and managing OneShip projects.

## Architecture

The `@oneship/core` package is designed to be a reusable library that can be leveraged by other tools within the OneShip monorepo. It is intentionally decoupled from any user-facing interface, such as a command-line tool or a web UI.

- **`@oneship/cli`**: The official command-line interface for OneShip. It uses this core package to execute its commands.
- **`create-oneship-app`**: The `npx` starter package. It uses `@oneship/cli`, which in turn uses `@oneship/core`.

## Responsibilities

- **Project Scaffolding**: Contains the logic for generating the base project structure from templates.
- **Feature Integration**: Handles the installation and configuration of optional features like authentication providers (NextAuth, Clerk), ORMs (Drizzle), and styling solutions (Tailwind CSS, Shadcn UI).
- **File System Operations**: Provides abstracted utilities for creating directories and manipulating files within a project.
- **Configuration Management**: Includes utilities for handling environment variables and project-specific configurations.

## Usage

This package is not intended to be used directly by end-users. It is a dependency for other OneShip tools. Its API is subject to change according to the needs of the tools that consume it.

For creating and managing projects, please use `@oneship/cli` or `create-oneship-app`.
