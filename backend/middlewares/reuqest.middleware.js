import {v4 as uuidv4} from 'uuid'
import {logger} from "../utils/logger.js"

export const requestMiddleware = (req,res,next)=>{
    console.log("UUID",uuidv4())
    req.logger = logger.child({
        requestId:uuidv4(),
        requestMethod: req.method,
        requestUrl: req.originalUrl
    });
    next()
}