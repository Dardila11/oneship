import { Command } from "commander"
import { authCommand } from "./auth.js"
import { customCommand } from "./custom.js"
import { dbCommand } from "./db.js"
import { envCommand } from "./env.js"

export const addCommand = new Command()
  .name("add")
  .description("Add features and integrations to your project")
  .addCommand(authCommand)
  .addCommand(dbCommand)
  .addCommand(envCommand)
  .addCommand(customCommand)
  .action(() => {
    // This will be the default action if no subcommand is provided
    addCommand.outputHelp()
  })
