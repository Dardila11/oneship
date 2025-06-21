#!/usr/bin/env node
import { handleError, logger } from "@oneship/core"
import { Command } from "commander"
import { createRequire } from "module"
import { addCommand } from "./commands/add.js"

const require = createRequire(import.meta.url)
const packageJson = require("../package.json")

const program = new Command()

async function main() {
  try {
    program
      .name("oneship")
      .version(packageJson.version)
      .description(packageJson.description)

    // Register commands
    program.addCommand(addCommand)

    // Example command
    program
      .command("hello")
      .description("A simple test command")
      .action(() => {
        logger.info("Hello from OneShip CLI!")
      })

    await program.parseAsync(process.argv)
  } catch (error) {
    handleError(error, logger)
  }
}

main()
