import fs from "fs-extra"
import { runner } from "hygen"
import Logger from "hygen/dist/logger"
import path from "path"
import prompts from "prompts"

export async function handleNewProject(projectDirectory?: string) {
  const { execa } = await import("execa")

  let name = projectDirectory
  if (!name) {
    const response = await prompts({
      type: "text",
      name: "name",
      message: "What is your project named?",
      initial: "my-oneship-app",
    })
    name = response.name
  }

  if (!name) {
    console.error("Project name is required.")
    process.exit(1)
  }

  // TODO: check if the project directory already exists
  if (fs.existsSync(name)) {
    console.error("Project directory already exists.")
    process.exit(1)
  }
  const projectDir = path.resolve(process.cwd(), name)
  await fs.ensureDir(projectDir)

  const defaultTemplates = path.resolve(__dirname, "..", "_templates")
  const logger = new Logger(console.log.bind(console))

  // Run base project generator
  await runner(["project", "new", "--name", name], {
    templates: defaultTemplates,
    cwd: process.cwd(), // Run from the directory where the CLI was executed
    logger,
    createPrompter: () => prompts,
    exec: (action, body) => {
      const opts = body && body.length > 0 ? { input: body } : {}
      return execa(action, { ...opts, shell: true })
    },
  })

  // TODO: if tailwind is false, chadcn should be false too
  const options = await prompts([
    {
      type: "confirm",
      name: "tailwind",
      message: "Use TailwindCSS?",
      initial: true,
    },
    {
      type: "select",
      name: "value",
      message: "Select auth provider:",
      choices: [
        { title: "Clerk", value: "clerk" },
        { title: "NextAuth.js", value: "next-auth" },
        { title: "Supabase Auth", value: "supabase" },
        { title: "BetterAuth", value: "better-auth" },
        { title: "None", value: "none" },
      ],
      initial: 0,
      skip: (prev: any, values: any) => !values.auth,
    },
    {
      type: (prev: boolean) => (prev ? "confirm" : null),
      name: "shadcn",
      message: "Use Shadcn UI?",
      initial: true,
    },
  ])

  if (options.tailwind) {
    await runner(["feature", "tailwind", "--name", name], {
      templates: defaultTemplates,
      cwd: process.cwd(),
      logger,
      createPrompter: () => prompts,
      exec: (action, body) => {
        const opts = body && body.length > 0 ? { input: body } : {}
        return execa(action, { ...opts, shell: true })
      },
    })
    console.log("Adding Tailwind CSS dependencies...")
    await execa(
      "pnpm",
      ["install", "-D", "tailwindcss", "postcss", "@tailwindcss/postcss"],
      { cwd: projectDir, stdio: "inherit" }
    )
  }

  if (options.shadcn) {
    console.log("Initializing Shadcn UI...")
    // Note: this will be interactive as shadcn-ui init doesn't support full non-interactive setup
    await execa("pnpm", ["dlx", "shadcn@latest", "init"], {
      cwd: projectDir,
      stdio: "inherit",
    })
  }

  if (options.auth && options.authProvider === "next-auth") {
    // NextAuth.js generator logic will go here
    await runner(["feature", "next-auth", "--name", name], {
      templates: defaultTemplates,
      cwd: process.cwd(),
      logger,
      createPrompter: () => prompts,
      exec: (action, body) => {
        const opts = body && body.length > 0 ? { input: body } : {}
        return execa(action, { ...opts, shell: true })
      },
    })
  }

  console.log("Installing dependencies...")
  await execa("pnpm", ["install"], { cwd: projectDir, stdio: "inherit" })

  console.log(`\nSuccess! Created ${name} at ${projectDir}\n`)
  console.log("Next steps:")
  console.log(`  cd ${name}`)
  console.log("  pnpm dev")
}

handleNewProject()
