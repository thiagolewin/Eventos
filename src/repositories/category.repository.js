import DBConfig from './../configs/dbConfig.js'
import pkg from 'pg'
const {Client, Pool} = pkg
export default class ProvinceRepository {
    getAllAsync = async()=> {
        let returnArray = null
        const client = new Client(DBConfig)
        try {
            await client.connect()
            const sql = "Select * From public.event_categories";
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
            const sql = "Select * From public.event_categories Where id = $1";
            
            const values = [parametros]
            const result = await client.query(sql,values)
            await client.end()
            returnArray = result.rows
        } catch (error) {
            console.log(error)
        }
        return returnArray
    }
    createAsync = async(entity)=> {
        let returnArray = null
        const client = new Client(DBConfig)
        try {
            await client.connect()
            const sql = `INSERT INTO event_categories (name, display_order) VALUES ($1, $2)`
            const values = [entity.name,entity.display_order]
            const result = await client.query(sql,values)
            await client.end()
            returnArray = result.rows
        } catch (error) {
            console.log(error)
        }
        return returnArray
    }
    updateAsync = async(entity)=> {
        let returnArray = null
        const client = new Client(DBConfig)
        try {
            await client.connect()
            const sql = `UPDATE public.event_categories
            SET name=$1, display_order=$2
            WHERE id = $3`
            const values = [entity.name,entity.display_order,entity.id]
            const result = await client.query(sql,values)
            await client.end()
            returnArray = result.rows
        } catch (error) {
            console.log(error)
        }
        return returnArray
    }
    DeleteByIdAsync = async(id)=> {
        let returnArray = null
        const client = new Client(DBConfig)
        try {
            await client.connect()
            const sql = "DELETE FROM public.event_categories WHERE id = " + id
            const result = await client.query(sql)
            await client.end()
            returnArray = result.rows
        } catch (error) {
            console.log(error)
        }
        return returnArray
    }
}