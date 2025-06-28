import {
  generateBaseProject,
  scaffoldProject,
  validateAndNormalizeOptions,
  type FeatureOptions,
} from "@oneship/core"
import { Command } from "commander"
import { getProjectName, promptForFeatures } from "../prompts.js"
import { createProjectDirectory } from "../utils/directory.js"

interface CLIOptions extends Partial<FeatureOptions> {
  projectDir?: string
  isInteractive: boolean
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
async function handleNewProject(options: CLIOptions) {
  const {
    isInteractive,
    projectDir: projectDirectory,
    ...featureFlags
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
    featureOptions = featureFlags
  }

  // if Shadcn is enabled, Tailwind must be enabled.
  // so we need to validate and normalize the options.
  const validatedOptions = validateAndNormalizeOptions(featureOptions)

  await scaffoldProject(validatedOptions, name, projectDir)
}

export const createCommand = new Command()
  .name("create")
  .description("Create a new Oneship project")
  .argument("[dir]", "The directory to create the project in")
  .option("--tailwind", "Enable Tailwind CSS")
  .option("--drizzle", "Enable Drizzle ORM")
  .option("--shadcn", "Enable Shadcn UI")
  .option("--next-auth", "Enable NextAuth.js")
  .option("--internationalization", "Enable Internationalization")
  .action(async (dir, options) => {
    const isInteractive =
      !options.tailwind &&
      !options.drizzle &&
      !options.shadcn &&
      !options.nextAuth &&
      !options.internationalization

    await handleNewProject({
      projectDir: dir,
      isInteractive,
      ...options,
    })
  })
