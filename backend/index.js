import express from "express";
import qrcode from 'qrcode';
import mongoose from "mongoose";
import helmet from "helmet";
import dotenv from 'dotenv'
dotenv.config()
import connectMongo from "./database/db.js"
import fileUpload from "express-fileupload";
import { requestMiddleware } from "./middlewares/reuqest.middleware.js";
import AuthRoute from "./routes/auth.route.js";
import {fileURLToPath} from 'url';
import path from "path";
import {createPool} from 'mysql';

const app = express();
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const pool = createPool({
    host:"localhost",
    user:"root",
    password:"",
    database:"LibraryManagement",
    connectionLimit: 10
})

pool.query(`CREATE TABLE IF NOT EXISTS users (
    id UUID NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
    
);
  `,(err,result,fields)=>{
    if(err){
        return console.log(err);
    }
   // return console.log('Result',result)
});


//connectMongo()
app.use(fileUpload({
    useTempFiles:true
}))
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({
    policy:"cross-origin"
}))

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(requestMiddleware)
app.use('/auth',AuthRoute)

app.listen(process.env.PORT || 5000,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})