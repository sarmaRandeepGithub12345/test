import express from "express"
import cors from "cors"
import pg from 'pg'
import dotenv from "dotenv"
import helmet from "helmet"
dotenv.config()
import fileUpload from "express-fileupload"
import { requestMiddleware } from "./middlewares/middlewareRequest.js"
import morgan from "morgan"
import { sendResponse } from "./utils/responseObj.js"
import { createTablesFunction } from "./database/createTables.js"
const PORT =process.env.PORT
const app =express()
//psql configuration and connection


const poolConfig = {
    host:process.env.DBURL,
    port:process.env.DBPORT,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    
    database: process.env.DATABASE
}

export const pool = new pg.Pool(poolConfig)

pool.connect(async(error)=>{
    if (error) {
        console.error(error);
        return;
      }
    
      console.log('Connected to database.');
})
//middlewares
app.use(fileUpload({
    useTempFiles:true
}))
//Helmet helps you secure your Express apps by setting various HTTP headers.
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({
    policy:"cross-origin"
}))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(requestMiddleware)
//create the tables
await createTablesFunction()

app.get("/",(req,res)=>{
    
    return sendResponse(res,200,"good",{"ok":"ok"})
})

//await pool.end()
app.listen(PORT,()=>{
    console.log(`Server running on port = ${PORT}`)
})