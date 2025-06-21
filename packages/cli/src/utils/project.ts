import fs from "fs"
import path from "path"

export function getProjectRoot(): string {
  let currentDir = process.cwd()
  while (currentDir !== path.parse(currentDir).root) {
    if (fs.existsSync(path.join(currentDir, "package.json"))) {
      const packageJson = JSON.parse(
        fs.readFileSync(path.join(currentDir, "package.json"), "utf-8")
      )
      if (packageJson.name !== "oneship" && !packageJson.workspaces) {
        return currentDir
      }
    }
    currentDir = path.dirname(currentDir)
  }
  throw new Error(
    "Could not find project root. Make sure you are in a valid project directory."
  )
}
