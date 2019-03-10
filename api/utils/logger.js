const pino = require('pino')

const fatalLogger = pino({
  name: 'fatal',
  errorLikeObjectKeys: ['err', 'error'],
  prettyPrint: {
    translateTime: 'SYS:standard'
  }
})
const errorLogger = pino({
  name: 'error',
  errorLikeObjectKeys: ['err', 'error'],
  prettyPrint: {
    translateTime: 'SYS:standard'
  }
})
const warnLogger = pino({
  name: 'warn',
  prettyPrint: {
    translateTime: 'SYS:standard'
  }
})
const infoLogger = pino({
  name: 'info',
  prettyPrint: {
    translateTime: 'SYS:standard'
  }
})

module.exports = {
  fatal: (message, log = '') => {
    fatalLogger.fatal(message, log instanceof Error ? log.toString() : log)
  },

  error: (message, log = '') => {
    errorLogger.error(message, log instanceof Error ? log.toString() : log)
  },

  warn: (message, log = '') => {
    warnLogger.warn(message, log instanceof Error ? log.toString() : log)
  },

  info: (message, log = '') => {
    infoLogger.info(message, log instanceof Error ? log.toString() : log)
  }
}