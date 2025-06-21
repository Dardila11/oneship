import { BaseError } from "@oneship/core"

export class CliError extends BaseError {
  constructor(message: string, details?: Record<string, any>) {
    super(message, "CliError", details)
  }
}

export * from "@oneship/core"
