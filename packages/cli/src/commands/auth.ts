import { Command } from "commander"

export const authCommand = new Command()
  .name("auth")
  .description("Add an authentication provider to your project")
  .action(() => {
    authCommand.outputHelp()
  })
