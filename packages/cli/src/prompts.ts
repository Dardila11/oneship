import { FeatureOptions } from "@oneship/core"
import prompts from "prompts"

export async function getProjectName(
  projectDirectory?: string
): Promise<string> {
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

  return name
}

export async function promptForFeatures(): Promise<FeatureOptions> {
  const options = await prompts(
    [
      {
        type: "confirm",
        name: "tailwind",
        message: "Use Tailwind CSS for styling? (recommended)",
        initial: true,
      },
      {
        type: "select",
        name: "authProvider",
        message: "Select an Authentication provider:",
        choices: [
          { title: "Next-Auth", value: "next-auth" },
          { title: "Clerk", value: "clerk" },
          { title: "Supabase Auth", value: "supabase-auth" },
          { title: "Lucia (in development)", value: "lucia" },
          { title: "BetterAuth", value: "better-auth" },
          { title: "None", value: "none" },
        ],
      },
      {
        type: "select",
        name: "orm",
        message: "Select a Database ORM:",
        choices: [
          { title: "Drizzle", value: "drizzle" },
          { title: "Prisma", value: "prisma" },
          { title: "None", value: "none" },
        ],
      },
      {
        type: (prev: string) =>
          prev === "drizzle" || prev === "prisma" ? "select" : null,
        name: "db",
        message: "Choose your database type:",
        choices: [
          { title: "PostgreSQL", value: "postgres" },
          { title: "MySQL", value: "mysql" },
          { title: "SQLite", value: "sqlite" },
        ],
      },
      {
        //type: (prev: boolean) => (prev ? "confirm" : null),
        type: "confirm",
        name: "shadcn",
        message: "Add Shadcn UI for your component library?",
        initial: true,
      },
      {
        type: "confirm",
        name: "internationalization",
        message: "Add Internationalization (next-intl)?",
        initial: true,
      },
      // {
      //   type: "select",
      //   name: "internationalization",
      //   message: "Add Internationalization (next-intl)?",
      //   choices: [
      //     { title: "With i18n routing [locale]", value: "with-i18n-routing" },
      //     { title: "Without i18n routing", value: "without-i18n-routing" },
      //   ],
      // },
    ],
    {
      onCancel: () => {
        console.log("\\nSetup canceled. Exiting...")
        process.exit(0)
      },
    }
  )
  return options as FeatureOptions
}
