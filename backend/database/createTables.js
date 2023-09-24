import { users } from "./tableSkeletons.js";
import { otp } from "./tableSkeletons.js";
import { news } from "./tableSkeletons.js";
import { pool } from "../index.js"
export const createTablesFunction =async()=>{
    try {
        const client = await pool.connect() 
        await client.query(users)
        await client.query(otp)
        await client.query(news)
        client.release();  
        console.log('All Tables created')
    } catch (error) {
        console.log(error)
    }
}
