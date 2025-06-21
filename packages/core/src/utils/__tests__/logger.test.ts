import { afterEach, beforeEach, describe, expect, it } from "vitest"
// Import Winston logging library for creating mock transport and logger in tests
import winston from "winston"
import { log, logger } from "../logger.js"

describe("Logger", () => {
  let logMessages: any[] = []

  beforeEach(() => {
    logMessages = []
    // Create a mock transport for Winston logger
    const mockTransport = new winston.transports.Console({
      format: winston.format.printf(
        (info: winston.Logform.TransformableInfo): string => {
          logMessages.push(info)
          return String(info.message || "")
        }
      ),
    })

    logger.clear() // Clear all transports
    logger.add(mockTransport)
  })

  afterEach(() => {
    logger.clear() // Clean up
  })

  it("should log messages with different levels", () => {
    log.info("Test info message")
    log.warn("Test warning message")
    log.error("Test error message")
    log.debug("Test debug message")

    expect(logMessages.length).toBe(4)
    expect(logMessages.some((msg) => msg.level === "info")).toBe(true)
    expect(logMessages.some((msg) => msg.level === "warn")).toBe(true)
    expect(logMessages.some((msg) => msg.level === "error")).toBe(true)
    expect(logMessages.some((msg) => msg.level === "debug")).toBe(true)
  })

  it("should include timestamp in log messages", () => {
    log.info("Test message with timestamp")

    const timestampRegex = /\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/
    expect(logMessages[0].timestamp).toMatch(timestampRegex)
  })

  it("should handle additional metadata", () => {
    const metadata = { userId: "123", action: "test" }
    log.info("Test message with metadata", metadata)

    expect(JSON.stringify(logMessages[0])).toContain("userId")
    expect(JSON.stringify(logMessages[0])).toContain("action")
  })
})
