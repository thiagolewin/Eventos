import DBConfig from './../configs/dbConfig.js'
import pkg from 'pg'
const {Client, Pool} = pkg
export default class ProvinceRepository {
    getAllAsync = async(parametros)=> {
        let returnArray = null
        const client = new Client(DBConfig)
        try {
            await client.connect()
            const sql = "Select * From public.events Where name = $1 and category = $2 and startdate = $3 and tag = $4";
            
            const values = [parametros.name,parametros.category,parametros.startdate,parametros.tag]
            const result = await client.query(sql,values)
            await client.end()
            returnArray = result.rows
        } catch (error) {
            console.log(error)
        }
        return returnArray
    }
}