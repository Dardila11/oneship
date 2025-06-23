import { FeatureOptions } from "./prompts"
import { runHygenSilent, runPnpmNoLogs } from "./utils"

async function getExeca() {
  const { execa } = await import("execa")
  return execa
}

export async function installTailwind(projectName: string, projectDir: string) {
  console.log("Adding Tailwind CSS...")
  await runHygenSilent(["feature", "use-tailwind", "--name", projectName])
  console.log("Adding Tailwind CSS dependencies...")
  await runPnpmNoLogs(
    ["add", "-D", "tailwindcss", "postcss", "@tailwindcss/postcss"],
    projectDir
  )
}

export async function installDrizzle(projectName: string, projectDir: string) {
  // create ./drizzle folder in root of project
  const execa = await getExeca()
  await execa("mkdir", ["-p", "drizzle"], { cwd: projectDir })
  // create src/lib/db folder in root of project
  await execa("mkdir", ["-p", "src/lib/db"], { cwd: projectDir })

  console.log("Adding Drizzle ORM...")
  await runHygenSilent(["feature", "use-drizzle", "--name", projectName])
  console.log("Adding Drizzle dependencies...")
  await runPnpmNoLogs(["add", "drizzle-orm", "pg"], projectDir)
  console.log("Adding Drizzle dev dependencies...")
  await runPnpmNoLogs(
    ["add", "-D", "drizzle-kit", "tsx", "@types/pg", "dotenv"],
    projectDir
  )
}
// using shadcn init
// no need of templates
export async function installShadcn(projectDir: string) {
  console.log("Initializing Shadcn UI...")
  const execa = await getExeca()
  await execa("pnpm", ["dlx", "shadcn@latest", "init", "-b", "neutral"], {
    cwd: projectDir,
    stdio: "inherit",
  })
}

export async function installNextAuth(projectName: string) {
  console.log("Adding NextAuth.js...")
  await runHygenSilent(["feature", "use-next-auth", "--name", projectName])
}

export async function installClerk(projectName: string, projectDir: string) {
  console.log("Adding Clerk...")
  await runHygenSilent(["feature", "use-clerk", "--name", projectName])

  // add clerk dependencies
  await runPnpmNoLogs(["add", "@clerk/nextjs"], projectDir)
}

export async function installBetterAuth(
  projectName: string,
  projectDir: string,
  options: FeatureOptions
) {
  console.log("Adding BetterAuth...")
  await runHygenSilent([
    "feature",
    "use-better-auth",
    "--name",
    projectName,
    "--db",
    options.db,
    "--adapter",
    options.orm,
  ])

  // add better-auth dependencies
  await runPnpmNoLogs(["add", "better-auth"], projectDir)
}

export async function installInternationalization(
  projectName: string,
  projectDir: string
) {
  console.log("Adding Internationalization...")
  await runHygenSilent([
    "feature",
    "use-internationalization",
    "--name",
    projectName,
  ])
  await runPnpmNoLogs(["add", "next-intl"], projectDir)
}
