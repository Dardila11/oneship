import fs from "fs"
import { afterEach, beforeEach, describe, expect, it } from "vitest"
import { z } from "zod"
import { ConfigManager, baseEnvSchema, createConfig } from "../config.js"

describe("ConfigManager", () => {
  const testEnvPath = ".env.test"
  const testEnvTemplatePath = ".env.template.test"

  // Define a test schema
  const testSchema = baseEnvSchema.extend({
    API_KEY: z.string(),
    PORT: z.string().transform(Number).pipe(z.number().min(1000).max(9999)),
    DEBUG: z
      .string()
      .transform((val) => val === "true")
      .default("false"),
  })

  beforeEach(async () => {
    // Create a test .env file
    const envContent = `
NODE_ENV=test
API_KEY=test-key
PORT=3000
DEBUG=true
`
    await fs.promises.writeFile(testEnvPath, envContent)

    // Create a test .env template file
    const templateContent = `
NODE_ENV=development
API_KEY=\${API_KEY}
PORT=3000
DEBUG=false
`
    await fs.promises.writeFile(testEnvTemplatePath, templateContent)

    // Clear any existing environment variables that might interfere with tests
    delete process.env.API_KEY
    delete process.env.PORT
    delete process.env.DEBUG
  })

  afterEach(async () => {
    // Clean up test files
    try {
      await fs.promises.unlink(testEnvPath)
      await fs.promises.unlink(testEnvTemplatePath)
    } catch (error) {
      // Ignore errors if files don't exist
    }
  })

  it("should load and validate configuration from .env file", () => {
    const config = createConfig(testSchema, { envPath: testEnvPath })
    const values = config.getAll()

    expect(values.NODE_ENV).toBe("test")
    expect(values.API_KEY).toBe("test-key")
    expect(values.PORT).toBe(3000)
    expect(values.DEBUG).toBe(true)
  })

  it("should get individual configuration values", () => {
    const config = createConfig(testSchema, { envPath: testEnvPath })

    expect(config.get("API_KEY")).toBe("test-key")
    expect(config.get("PORT")).toBe(3000)
  })

  it("should create a new .env file from template", async () => {
    const values = {
      API_KEY: "new-test-key",
    }

    await ConfigManager.createEnvFile(testEnvTemplatePath, testEnvPath, values)

    const envContent = await fs.promises.readFile(testEnvPath, "utf-8")
    expect(envContent).toContain("API_KEY=new-test-key")
    expect(envContent).toContain("PORT=3000")
  })

  it("should validate an existing .env file", async () => {
    const result = await ConfigManager.validateEnvFile(testEnvPath, testSchema)
    expect(result.isValid).toBe(true)
  })

  it("should return validation errors for invalid .env file", async () => {
    // Create an invalid .env file
    const invalidEnvContent = `
NODE_ENV=invalid
API_KEY=test-key
PORT=invalid
DEBUG=invalid
`
    await fs.promises.writeFile(testEnvPath, invalidEnvContent)

    const result = await ConfigManager.validateEnvFile(testEnvPath, testSchema)
    expect(result.isValid).toBe(false)
    expect(result.errors).toBeDefined()
  })

  it("should throw error when required environment variables are missing", async () => {
    // Create a config without required API_KEY
    const envContent = `
NODE_ENV=test
PORT=3000
`
    await fs.promises.writeFile(testEnvPath, envContent)

    // Wait for the file to be written
    await new Promise((resolve) => setTimeout(resolve, 100))

    // Clear any existing environment variables
    delete process.env.API_KEY

    expect(() => {
      createConfig(testSchema, { envPath: testEnvPath })
    }).toThrowError(/Invalid environment configuration/)
  })
})
