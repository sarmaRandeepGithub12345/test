import winston from 'winston'

const logLevels = {
    error:'error',
    warn:'warn',
    info:'info',
    debug:'debug'
}
export const logger = winston.createLogger({
    levels:logLevels,
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({
            format:'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.printf(({
            timestamp,level,message,requestId
        })=>{
            console.log(Object.keys(requestId).length)
            return `${timestamp} [${level}] [${requestId}] ${message}`
        })
    ),
    transports: [
        new winston.transports.Console()

    ]
})