import {
  installBetterAuth,
  installClerk,
  installDrizzle,
  installInternationalization,
  installNextAuth,
  installShadcn,
  installTailwind,
} from "./features"
import { FeatureOptions } from "./prompts"
import { runPnpm } from "./utils"

async function getExeca() {
  const { execa } = await import("execa")
  return execa
}

export async function scaffoldProject(
  options: FeatureOptions,
  projectName: string,
  projectDir: string
) {
  console.log("Scaffolding project...")
  if (options.tailwind) {
    await installTailwind(projectName, projectDir)
  }

  if (options.orm === "drizzle") {
    await installDrizzle(projectName, projectDir)
  }

  if (options.authProvider === "clerk") {
    await installClerk(projectName, projectDir)
  }

  if (options.authProvider === "next-auth") {
    await installNextAuth(projectName)
  }

  if (options.authProvider === "better-auth") {
    await installBetterAuth(projectName, projectDir, options)
  }

  if (options.drizzle) {
    await installDrizzle(projectName, projectDir)
  }

  if (options.shadcn) {
    await installShadcn(projectDir)
  }

  if (options.internationalization) {
    await installInternationalization(projectName, projectDir)
  }

  console.log("Installing dependencies...")
  await runPnpm(["install"], projectDir)

  const execa = await getExeca()
  console.log("Initializing git repository...")
  await execa("git", ["init"], { cwd: projectDir })
  await execa("git", ["add", "."], { cwd: projectDir })
  await execa(
    "git",
    ["commit", "-m", "Initial commit from create-oneship-app"],
    {
      cwd: projectDir,
    }
  )

  console.log(`nSuccess! Created ${projectName} at ${projectDir}\\n`)
  console.log("Next steps:")
  console.log(`  cd ${projectName}`)
  console.log("  pnpm dev")
}
