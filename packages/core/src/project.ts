import { runHygenSilent } from "./utils/scaffold-utils.js"

export async function generateBaseProject(
  projectName: string,
  projectDir: string
) {
  console.log("Creating a new OneShip project...")
  await runHygenSilent(["project", "new", "--name", projectName], projectDir)
}
