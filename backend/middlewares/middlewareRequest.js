import {v4 as uuidv4} from 'uuid'
import { logger } from '../utils/logger.js'

//middleware to generate and attach a unique request
export const requestMiddleware=(req,res,next)=>{
    console.log("UUID",uuidv4())
    req.logger = logger.child({
        requestId:uuidv4(),
        requestMehod: req.method,
        requestUrl: req.originalUrl
    });
    next()
}