#!/usr/bin/env node
import { Command } from "commander"

const program = new Command()

program
  .name("oneship")
  .description("CLI toolkit for Oneship")
  .version("0.0.1")
  .option("-v, --version", "output the version number")
  .option("-h, --help", "display help for command")

program.parse(process.argv)
