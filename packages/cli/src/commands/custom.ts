import { Command } from "commander"

export const customCommand = new Command()
  .name("custom")
  .description("Run custom scripts or add custom features")
  .action(() => {
    customCommand.outputHelp()
  })
