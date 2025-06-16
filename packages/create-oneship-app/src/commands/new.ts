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

  const options = await prompts([
    {
      type: "select",
      name: "language",
      message: "JavaScript or TypeScript?",
      choices: [
        { title: "TypeScript", value: "typescript" },
        { title: "JavaScript", value: "javascript" },
      ],
      initial: 0,
    },
    {
      type: "confirm",
      name: "tailwind",
      message: "Use TailwindCSS?",
      initial: true,
    },
    {
      type: "confirm",
      name: "shadcn",
      message: "Add Shadcn UI?",
      initial: false,
    },
    {
      type: "confirm",
      name: "auth",
      message: "Include Auth?",
      initial: false,
    },
    {
      type: "select",
      name: "authProvider",
      message: "Select auth provider:",
      choices: [
        { title: "Clerk", value: "clerk" },
        { title: "NextAuth.js", value: "next-auth" },
        { title: "Supabase Auth", value: "supabase" },
      ],
      initial: 0,
      skip: (prev: any, values: any) => !values.auth,
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
      ["install", "-D", "tailwindcss", "postcss", "autoprefixer"],
      { cwd: projectDir, stdio: "inherit" }
    )
  }

  if (options.shadcn) {
    // Shadcn UI generator logic will go here
  }

  if (options.auth && options.authProvider === "next-auth") {
    // NextAuth.js generator logic will go here
  }

  console.log("Installing dependencies...")
  await execa("pnpm", ["install"], { cwd: projectDir, stdio: "inherit" })

  console.log(`\nSuccess! Created ${name} at ${projectDir}\n`)
  console.log("Next steps:")
  console.log(`  cd ${name}`)
  console.log("  pnpm dev")
}
