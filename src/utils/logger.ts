import { createLogger, format, transports } from 'winston'

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(info => {
      const { timestamp, level, message } = info as { timestamp: string, level: string, message: string }
      return `${timestamp} [${level.toUpperCase()}]: ${message}`
    })
  ),
  transports: [
    // new transports.Console(),
    new transports.File({ filename: 'logs/error.log', level: 'error' })
    // new transports.File({ filename: 'logs/combined.log' })
  ]
})

export { logger }
