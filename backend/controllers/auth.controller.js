import {v4 as uuidv4} from 'uuid'
import { pool } from "../index.js";
import { sendResponse } from "../utils/response.Obj.js";
class AuthController {

    static async loginFunct(req,res,next){
        const {name,email,password} = req.body;
        console.log(name)
        pool.getConnection((err,connection)=>{
            if(err){
                console.error('Error getting connection from pool:',err);
                return res.status(500).json({error:'Error connecting to the database'});
            }
            
            connection.query('INSERT INTO users (id,name) VALUES (?,?)',[uuidv4(),name],(error, results, fields) => {
                // Release the connection back to the pool
                connection.release();
          
                if (error) {
                  console.error('Error executing query:', error);
                  return res.status(500).json({ error: 'Error inserting data' });
                }});
        })

        return sendResponse(res,200,"good")
    }
}
export default AuthController