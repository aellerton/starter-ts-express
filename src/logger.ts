import expressWinston from 'express-winston'
import winston from 'winston'

const coloriser = winston.format.colorize()

// Reference: https://githubcom/winstonjs/winston/issues/1388
//
// Note: it may be useful to call: winston.configure({...})

const logger: winston.Logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.align(),
    winston.format.splat(),
    // winston.format.colorize(), // can use colorize then `simple` in a chain - or use printf
    // winston.format.simple(),
    winston.format.printf((msg: any) => {
      return `${process.env.NODE_ENV} ${msg.timestamp} ` + coloriser.colorize(msg.level, `${msg.level} ${msg.message}`)
    }),
  ),
  level: 'debug',
  transports: [],
})

if (process.env.NODE_ENV === 'production') {
  logger.add(new winston.transports.File({filename: 'server.log'}))
} else {
  logger.add(new winston.transports.Console())
}

export let expressLogger = expressWinston.logger({
  winstonInstance: logger,
  // transports: [
  //   new winston.transports.Console(),
  // ]
})

export default logger
