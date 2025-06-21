import { Command } from "commander"

export const addCommand = new Command()
  .name("add")
  .description("Add features and integrations to your project")
  .action(() => {
    // This will be the default action if no subcommand is provided
    addCommand.outputHelp()
  })
