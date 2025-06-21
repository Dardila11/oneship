import { afterEach, describe, expect, it, vi } from "vitest"
import {
  ApiError,
  BaseError,
  CommandError,
  ConfigError,
  FileSystemError,
  handleError,
  TemplateError,
  ValidationError,
} from "../errors.js"

describe("Error Handling Utilities", () => {
  const exit = vi
    .spyOn(process, "exit")
    .mockImplementation(() => undefined as never)
  const error = vi.spyOn(console, "error").mockImplementation(() => {})

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe("Custom Error Classes", () => {
    it("should create a BaseError with correct properties", () => {
      const err = new BaseError("Base error message", "BASE_CODE", {
        detail: 1,
      })
      expect(err).toBeInstanceOf(Error)
      expect(err).toBeInstanceOf(BaseError)
      expect(err.message).toBe("Base error message")
      expect(err.code).toBe("BASE_CODE")
      expect(err.details).toEqual({ detail: 1 })
      expect(err.name).toBe("BaseError")
    })

    it("should create specific error types that inherit from BaseError", () => {
      const configErr = new ConfigError("Config fail")
      expect(configErr).toBeInstanceOf(BaseError)
      expect(configErr.code).toBe("CONFIG_ERROR")

      const fsErr = new FileSystemError("File fail")
      expect(fsErr).toBeInstanceOf(BaseError)
      expect(fsErr.code).toBe("FILESYSTEM_ERROR")

      const validationErr = new ValidationError("Validation fail")
      expect(validationErr).toBeInstanceOf(BaseError)
      expect(validationErr.code).toBe("VALIDATION_ERROR")

      const commandErr = new CommandError("Command fail")
      expect(commandErr).toBeInstanceOf(BaseError)
      expect(commandErr.code).toBe("COMMAND_ERROR")

      const templateErr = new TemplateError("Template fail")
      expect(templateErr).toBeInstanceOf(BaseError)
      expect(templateErr.code).toBe("TEMPLATE_ERROR")

      const apiErr = new ApiError("API fail")
      expect(apiErr).toBeInstanceOf(BaseError)
      expect(apiErr.code).toBe("API_ERROR")
    })
  })

  describe("handleError", () => {
    it("should handle BaseError instances correctly", () => {
      const err = new ConfigError("Invalid config", { path: "/test" })
      handleError(err)
      expect(error).toHaveBeenCalledWith("Error [CONFIG_ERROR]: Invalid config")
      expect(error).toHaveBeenCalledWith("Details:", { path: "/test" })
      expect(exit).toHaveBeenCalledWith(1)
    })

    it("should handle standard Error instances correctly", () => {
      const err = new Error("Unexpected error")
      handleError(err)
      expect(error).toHaveBeenCalledWith(
        "An unexpected error occurred: Unexpected error"
      )
      expect(exit).toHaveBeenCalledWith(1)
    })

    it("should handle unknown error types", () => {
      const err = "Just a string error"
      handleError(err)
      expect(error).toHaveBeenCalledWith(
        "An unknown error occurred:",
        "Just a string error"
      )
      expect(exit).toHaveBeenCalledWith(1)
    })
  })
})
