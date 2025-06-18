import { runner } from "hygen"
import Logger from "hygen/dist/logger"
import path from "path"
import prompts from "prompts"

async function getExeca() {
  const { execa } = await import("execa")
  return execa
}

const defaultTemplates = path.resolve(__dirname, "..", "..", "_templates")
const logger = new Logger(console.log.bind(console))

const exec = async (action: string, body: string) => {
  const execa = await getExeca()
  const opts = body && body.length > 0 ? { input: body } : {}
  return execa(action, { ...opts, shell: true })
}

export function getRunnerConfig() {
  return {
    templates: defaultTemplates,
    cwd: process.cwd(), // Run from the directory where the CLI was executed
    logger,
    createPrompter: () => prompts,
    exec,
  }
}

export async function runHygen(args: string[]) {
  return runner(args, getRunnerConfig())
}

export async function runPnpm(args: string[], cwd: string) {
  const execa = await getExeca()
  return execa("pnpm", args, { cwd, stdio: "inherit" })
}
