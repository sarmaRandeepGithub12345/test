// winston provides a flexible and extensible way to log messages, errors, and other information in a structured format. Winston is particularly well-suited for larger and more complex Node.js applications, as it allows developers to customize log handling and transport to various destinations.
import winston from 'winston';
// Define the log levels and corresponding colors
const logLevels = {
    error:'error',
    warn:'warn',
    info:'info',
    debug:'debug'
}
// Create a Winston logger instance
export const logger = winston.createLogger({
    levels:logLevels,
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({ format:'YYYY-MM-DD HH:mm:ss'}),
        winston.format.printf(({
            timestamp,level,message,requestId
        })=>{
            console.log(Object.keys(requestId).length)
            return `${timestamp} [${level}] [${requestId}] ${message}`
        })
    ),
    transports: [
        new winston.transports.Console()
        //Add other transports if needed
    ]
})