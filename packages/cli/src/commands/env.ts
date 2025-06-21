import { Command } from "commander"

export const envCommand = new Command()
  .name("env")
  .description("Manage your project's environment variables")
  .action(() => {
    envCommand.outputHelp()
  })
