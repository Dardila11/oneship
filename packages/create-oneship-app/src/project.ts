import fs from "fs-extra"
import path from "path"
import prompts from "prompts"
import { runHygenSilent } from "./utils"

export async function createProjectDirectory(
  projectName: string
): Promise<string> {
  const projectDir = path.resolve(process.cwd(), projectName)
  if (fs.existsSync(projectDir)) {
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

    await fs.emptyDir(projectDir)
  } else {
    await fs.ensureDir(projectDir)
  }
  return projectDir
}

export async function generateBaseProject(projectName: string) {
  console.log("Creating a new OneShip project...")
  await runHygenSilent(["project", "new", "--name", projectName])
}
