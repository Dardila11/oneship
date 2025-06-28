import { Logger, runner } from "hygen"
import path from "path"

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

export function getRunnerConfig(cwd?: string) {
  return {
    templates: defaultTemplates,
    cwd: cwd || process.cwd(), // Run from the directory where the CLI was executed
    logger,
    exec,
  }
}

export async function runHygenSilent(args: string[], cwd?: string) {
  const config = getRunnerConfig(cwd)
  config.logger = new Logger(() => {}) // Silent logger
  return runner(args, config)
}

export async function runHygen(args: string[], cwd?: string) {
  return runner(args, getRunnerConfig(cwd))
}

export async function runPnpm(args: string[], cwd: string) {
  const execa = await getExeca()
  return execa("pnpm", args, { cwd, stdio: "inherit" })
}

export async function runPnpmNoLogs(args: string[], cwd: string) {
  const execa = await getExeca()
  return execa("pnpm", args, { cwd, stdio: "ignore" })
}

export async function runPnpmSilent(args: string[], cwd: string) {
  const execa = await getExeca()
  return execa("pnpm", args, { cwd })
}

export async function createLocalizedAppFolder(projectDir: string) {
  const execa = await getExeca()
  await execa("mv", ["src/app", "src/app_temp"], { cwd: projectDir })
  await execa("mkdir", ["src/app"], { cwd: projectDir })
  await execa("mv", ["src/app_temp", "src/app/[locale]"], { cwd: projectDir })
}

export async function localizedAppFolderExists(projectDir: string) {
  const execa = await getExeca()
  const { stdout } = await execa("ls", ["src/app/[locale]/"], {
    cwd: projectDir,
  })
  return stdout.length > 0
}
