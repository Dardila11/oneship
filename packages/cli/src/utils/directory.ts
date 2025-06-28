import { directoryExists, emptyDirectory, ensureDirectory } from "@oneship/core"
import path from "path"
import prompts from "prompts"

export async function createProjectDirectory(
  projectName: string
): Promise<string> {
  const projectDir = path.resolve(process.cwd(), projectName)
  if (directoryExists(projectDir)) {
    const { overwrite } = await prompts({
      type: "confirm",
      name: "overwrite",
      message: `Directory '${projectName}' already exists. Do you want to overwrite it?`,
      initial: false,
    })

    if (!overwrite) {
      console.log("\\nSetup canceled. Exiting...")
      process.exit(0)
    }

    await emptyDirectory(projectDir)
  } else {
    await ensureDirectory(projectDir)
  }
  return projectDir
}
