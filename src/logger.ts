const { createLogger, format, transports } = require('winston')

/**
 * use JS here to better compatibility
 * @type {winston.Logger}
 */
const logger = createLogger({
  level: process.env.LOG_LEVEL ? process.env.LOG_LEVEL : 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
    format.colorize()
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'error.log', level: 'error' })
  ]
})

export default logger
