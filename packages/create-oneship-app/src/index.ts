#!/usr/bin/env node
import { Command } from "commander"
import packageJson from "../package.json"
import { handleNewProject } from "./cli"

async function main() {
  const program = new Command()

  program
    .name(packageJson.name)
    .version(packageJson.version)
    .description(packageJson.description)
    .argument("[dir]", "The directory to create the project in")
    .option("--tailwind", "Enable Tailwind CSS")
    .option("--drizzle", "Enable Drizzle ORM")
    .option("--shadcn", "Enable Shadcn UI")
    .option("--next-auth", "Enable NextAuth.js")
    .action(async (dir, options) => {
      const isInteractive =
        !options.tailwind &&
        !options.drizzle &&
        !options.shadcn &&
        !options.nextAuth

      await handleNewProject({
        projectDir: dir,
        isInteractive,
        ...options,
      })
    })

  await program.parseAsync(process.argv)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
