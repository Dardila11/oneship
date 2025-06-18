import { runHygen, runPnpm } from "./utils"

async function getExeca() {
  const { execa } = await import("execa")
  return execa
}

export async function installTailwind(projectName: string, projectDir: string) {
  console.log("Adding Tailwind CSS...")
  await runHygen(["feature", "use-tailwind", "--name", projectName])
  console.log("Adding Tailwind CSS dependencies...")
  await runPnpm(
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
  await runHygen(["feature", "use-drizzle", "--name", projectName])
  console.log("Adding Drizzle dependencies...")
  await runPnpm(["add", "drizzle-orm", "pg"], projectDir)
  console.log("Adding Drizzle dev dependencies...")
  await runPnpm(
    ["add", "-D", "drizzle-kit", "tsx", "@types/pg", "dotenv"],
    projectDir
  )
}
// using shadcn init
// no need of templates
export async function installShadcn(projectDir: string) {
  console.log("Initializing Shadcn UI...")
  const execa = await getExeca()
  await execa("pnpm", ["dlx", "shadcn@latest", "init"], {
    cwd: projectDir,
    stdio: "inherit",
  })
}

export async function installNextAuth(projectName: string) {
  console.log("Adding NextAuth.js...")
  await runHygen(["feature", "use-next-auth", "--name", projectName])
}

export async function installClerk(projectName: string, projectDir: string) {
  console.log("Adding Clerk...")
  await runHygen(["feature", "use-clerk", "--name", projectName])

  // add clerk dependencies
  await runPnpm(["add", "@clerk/nextjs"], projectDir)
}
