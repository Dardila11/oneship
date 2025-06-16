#!/usr/bin/env node
import { Command } from "commander"
import { handleNewProject } from "./commands/new"

const program = new Command()

program
  .name("create-oneship-app")
  .description("Scaffold a new OneShip project")
  .version("0.1.0")
  .argument("[project-directory]", "Directory to create the new project in")
  .action(handleNewProject)

program.parse(process.argv)
