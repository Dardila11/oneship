import { config as dotenvConfig } from "dotenv"
import fs from "fs"
import path from "path"
import { z } from "zod"
import { log } from "./logger.js"

// Define the base schema for environment variables
const baseEnvSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
})

// Configuration manager class
export class ConfigManager<T extends z.ZodType> {
  private config: z.infer<T>
  private schema: T
  private envPath: string

  constructor(schema: T, options: { envPath?: string } = {}) {
    this.schema = schema
    this.envPath = options.envPath || ".env"
    this.config = this.loadConfig()
  }

  private loadConfig(): z.infer<T> {
    try {
      // Load environment variables from .env file
      const envResult = dotenvConfig({ path: this.envPath })

      if (envResult.error) {
        log.warn(`Failed to load .env file: ${envResult.error.message}`)
      }

      // Parse and validate environment variables
      const result = this.schema.safeParse({
        ...process.env,
        ...(envResult.parsed || {}),
      })

      if (!result.success) {
        const errorMessage = "Invalid environment configuration:"
        const formattedError = result.error.format()
        log.error(errorMessage, formattedError)
        throw new Error(
          `${errorMessage}\n${JSON.stringify(formattedError, null, 2)}`
        )
      }

      return result.data
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }
      log.error("Failed to load configuration", error)
      throw new Error("Failed to load configuration")
    }
  }

  // Get a specific configuration value
  get<K extends keyof z.infer<T>>(key: K): z.infer<T>[K] {
    return this.config[key]
  }

  // Get all configuration values
  getAll(): z.infer<T> {
    return { ...this.config }
  }

  // Create a new .env file with default values
  static async createEnvFile(
    templatePath: string,
    targetPath: string = ".env",
    values: Record<string, string> = {}
  ): Promise<void> {
    try {
      // Read the template file
      const template = await fs.promises.readFile(templatePath, "utf-8")

      // Replace placeholders with values
      const envContent = template.replace(/\${(\w+)}/g, (_, key) => {
        return values[key] || process.env[key] || ""
      })

      // Create the target directory if it doesn't exist
      await fs.promises.mkdir(path.dirname(targetPath), { recursive: true })

      // Write the .env file
      await fs.promises.writeFile(targetPath, envContent)

      log.info(`Created .env file at ${targetPath}`)
    } catch (error) {
      log.error("Failed to create .env file", error)
      throw error
    }
  }

  // Validate an existing .env file against a schema
  static async validateEnvFile(
    envPath: string,
    schema: z.ZodType
  ): Promise<{ isValid: boolean; errors?: z.ZodError }> {
    try {
      const envContent = await fs.promises.readFile(envPath, "utf-8")
      const envValues = dotenvConfig({ path: envPath }).parsed || {}

      const result = schema.safeParse(envValues)

      if (!result.success) {
        return { isValid: false, errors: result.error }
      }

      return { isValid: true }
    } catch (error) {
      log.error("Failed to validate .env file", error)
      throw error
    }
  }
}

// Export the base schema and helper types
export { baseEnvSchema }
export type BaseEnv = z.infer<typeof baseEnvSchema>

// Helper function to create a typed config manager
export function createConfig<T extends z.ZodType>(
  schema: T,
  options?: { envPath?: string }
): ConfigManager<T> {
  return new ConfigManager(schema, options)
}
