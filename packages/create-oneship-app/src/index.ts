#!/usr/bin/env node
import { createCommand } from "@oneship/cli/commands/create"

async function main() {
  // The `create-oneship-app` package is a lightweight wrapper
  // that directly invokes the `create` command from `@oneship/cli`.
  await createCommand.parseAsync(process.argv)
}

main().catch((err) => {
  // Error handling should be done within the command itself,
  // but we add a catch-all here for safety.
  console.error(err)
  process.exit(1)
})
