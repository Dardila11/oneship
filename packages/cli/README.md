# @oneship/cli

This package contains the command-line interface for `create-oneship-app`. It is responsible for:

- Parsing user commands and arguments.
- Displaying interactive prompts to gather project requirements.
- Orchestrating the project scaffolding process by invoking the functionality exposed by the `@oneship/core` package.

## Usage

This package is not intended to be used directly. It is a dependency of `create-oneship-app` and is called internally when you run `npx create-oneship-app`.
