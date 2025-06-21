/**
 * Custom error classes for OneShip CLI
 */
import type { Logger } from "winston"

// Base class for custom errors
export class BaseError extends Error {
  public readonly code: string
  public readonly details?: Record<string, any>

  constructor(message: string, code: string, details?: Record<string, any>) {
    super(message)
    this.name = this.constructor.name
    this.code = code
    this.details = details
    Object.setPrototypeOf(this, new.target.prototype)
  }
}

// Specific error types
export class ConfigError extends BaseError {
  constructor(message: string, details?: Record<string, any>) {
    super(message, "CONFIG_ERROR", details)
  }
}

export class FileSystemError extends BaseError {
  constructor(message: string, details?: Record<string, any>) {
    super(message, "FILESYSTEM_ERROR", details)
  }
}

export class ValidationError extends BaseError {
  constructor(message: string, details?: Record<string, any>) {
    super(message, "VALIDATION_ERROR", details)
  }
}

export class CommandError extends BaseError {
  constructor(message: string, details?: Record<string, any>) {
    super(message, "COMMAND_ERROR", details)
  }
}

export class TemplateError extends BaseError {
  constructor(message: string, details?: Record<string, any>) {
    super(message, "TEMPLATE_ERROR", details)
  }
}

export class ApiError extends BaseError {
  constructor(message: string, details?: Record<string, any>) {
    super(message, "API_ERROR", details)
  }
}

// Error handling utility
export function handleError(error: unknown, logger: Logger): void {
  if (error instanceof BaseError) {
    logger.error(`[${error.code}] ${error.message}`)
    if (error.details) {
      logger.error("Details:", error.details)
    }
  } else if (error instanceof Error) {
    logger.error(`An unexpected error occurred: ${error.message}`)
  } else {
    logger.error("An unknown error occurred:", error)
  }
  process.exit(1)
}
