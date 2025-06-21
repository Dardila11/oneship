import { Command } from "commander"
import { authCommand } from "./auth.js"
import { dbCommand } from "./db.js"

export const addCommand = new Command()
  .name("add")
  .description("Add features and integrations to your project")
  .addCommand(authCommand)
  .addCommand(dbCommand)
  .action(() => {
    // This will be the default action if no subcommand is provided
    addCommand.outputHelp()
  })
