import DBConfig from './../configs/dbConfig.js'
import pkg from 'pg'
const {Client, Pool} = pkg
export default class ProvinceRepository {
    getAllAsync = async()=> {
        let returnArray = null
        const client = new Client(DBConfig)
        try {
            await client.connect()
            const sql = "Select * From public.event_locations";
            const result = await client.query(sql)
            await client.end()
            returnArray = result.rows
        } catch (error) {
            console.log(error)
        }
        return returnArray
    }
    getAllAsyncId = async(parametros)=> {
        let returnArray = null
        const client = new Client(DBConfig)
        try {
            await client.connect()
            const sql = "Select * From public.events Where id_event_location = $1";
            
            const values = [parametros]
            const result = await client.query(sql,values)
            await client.end()
            returnArray = result.rows
        } catch (error) {
            console.log(error)
        }
        return returnArray
    }
}