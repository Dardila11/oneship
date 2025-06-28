import fs from "fs-extra"

export async function ensureDirectory(dir: string) {
  await fs.ensureDir(dir)
}

export async function emptyDirectory(dir: string) {
  await fs.emptyDir(dir)
}

export function directoryExists(dir: string): boolean {
  return fs.existsSync(dir)
}
