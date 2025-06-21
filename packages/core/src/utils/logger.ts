import chalk from "chalk"
import winston from "winston"

const { createLogger, format, transports } = winston
const { combine, timestamp, printf, json } = format

// Custom format for console output with colors
const consoleFormat = printf(({ level, message, timestamp, ...metadata }) => {
  // Use chalk methods directly instead of dynamic access
  const levelColors = {
    error: chalk.red,
    warn: chalk.yellow,
    info: chalk.green,
    debug: chalk.blue,
  }

  const colorLevel = (level: string) => {
    return (levelColors[level as keyof typeof levelColors] || chalk.white)(
      level.toUpperCase()
    )
  }

  const coloredLevel = colorLevel(level)
  const coloredTimestamp = chalk.gray(timestamp)

  let output = `${coloredTimestamp} [${coloredLevel}] ${message}`

  // Add metadata if present
  if (Object.keys(metadata).length > 0) {
    output += " " + JSON.stringify(metadata)
  }

  return output
})

// Create the logger instance
export const logger = createLogger({
  level: "debug",
  format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), consoleFormat),
  transports: [
    new transports.Console({
      format: combine(
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        consoleFormat
      ),
    }),
    new transports.File({
      filename: "error.log",
      level: "error",
      format: combine(timestamp(), json()),
    }),
    new transports.File({
      filename: "combined.log",
      format: combine(timestamp(), json()),
    }),
  ],
})

// Export convenience methods
export const log = {
  error: (message: string, ...meta: any[]) =>
    logger.error(message, ...(meta.length ? meta : [{}])),
  warn: (message: string, ...meta: any[]) =>
    logger.warn(message, ...(meta.length ? meta : [{}])),
  info: (message: string, ...meta: any[]) =>
    logger.info(message, ...(meta.length ? meta : [{}])),
  debug: (message: string, ...meta: any[]) =>
    logger.debug(message, ...(meta.length ? meta : [{}])),
}

// Export types for better TypeScript support
export type LogLevel = "error" | "warn" | "info" | "debug"
export type LogFunction = (message: string, ...meta: any[]) => void
export type Logger = Record<LogLevel, LogFunction>
