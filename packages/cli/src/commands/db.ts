import { Command } from "commander"

export const dbCommand = new Command()
  .name("db")
  .description("Add a database provider to your project")
  .action(() => {
    dbCommand.outputHelp()
  })
