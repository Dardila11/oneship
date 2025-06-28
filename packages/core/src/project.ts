import { runHygen } from "./utils/scaffold-utils.js"

export async function generateBaseProject(projectName: string) {
  console.log("Creating a new OneShip project...")
  await runHygen(["project", "new", "--name", projectName])
}
