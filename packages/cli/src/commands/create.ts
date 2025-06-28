import { createProjectDirectory, generateBaseProject } from "./project"
import {
  getProjectName,
  promptForFeatures,
  type FeatureOptions,
} from "./prompts"
import { scaffoldProject } from "./scaffold"
import { validateAndNormalizeOptions } from "./utils/config"

interface CLIOptions {
  projectDir?: string
  isInteractive: boolean
  tailwind?: boolean
  drizzle?: boolean
  shadcn?: boolean
  authProvider?:
    | "clerk"
    | "next-auth"
    | "supabase-auth"
    | "lucia"
    | "better-auth"
    | "none"
  orm?: "drizzle" | "prisma" | "none"
  db?: "postgres" | "mysql" | "sqlite" | "none"
  internationalization?: boolean
}
/**
 * Handle the new project creation process.
 * @param options - The CLI options.
 * @returns A promise that resolves when the project is created.
 * @example
 * ```ts
 * await handleNewProject({
 *   projectDir: "my-project",
 *   isInteractive: true,
 *   tailwind: true,
 *   drizzle: true,
 * })
 * ```
 */
export async function handleNewProject(options: CLIOptions) {
  const {
    projectDir: projectDirectory,
    isInteractive,
    tailwind,
    drizzle,
    shadcn,
    authProvider,
    orm,
    db,
    internationalization,
  } = options

  const name = await getProjectName(projectDirectory)
  const projectDir = await createProjectDirectory(name)

  // First, generate the base project.
  await generateBaseProject(name)

  // Then, prompt for the features.
  let featureOptions: Partial<FeatureOptions>

  // If the process is interactive, prompt for the features.
  // which is true if no options are passed from the CLI.
  if (isInteractive) {
    featureOptions = await promptForFeatures()
  } else {
    // If the process is not interactive,
    // use the options passed from the CLI.
    featureOptions = {
      tailwind: tailwind || false,
      drizzle: drizzle || false,
      shadcn: shadcn || false,
      authProvider: authProvider || "none",
      orm: orm || "drizzle",
      db: db || "postgres",
      internationalization: internationalization || false,
    }
  }

  // if Shadcn is enabled, Tailwind must be enabled.
  // so we need to validate and normalize the options.
  const validatedOptions = validateAndNormalizeOptions(featureOptions)

  await scaffoldProject(validatedOptions, name, projectDir)
}
