import DBConfig from './../configs/dbConfig.js'
import pkg from 'pg'
const {Client, Pool} = pkg
export default class ProvinceRepository {
    createAsync = async(entity)=> {
        let returnArray = null
        const client = new Client(DBConfig)
        try {
            await client.connect()
            const sql = `INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4)`
            const values = [entity.first_name,entity.last_name,entity.username,entity.password]
            const result = await client.query(sql,values)
            await client.end()
            returnArray = result.rows
        } catch (error) {
            console.log(error)
        }
        return returnArray
    }
    LoginAsync  = async(entity)=> {
        let returnArray = null
        const client = new Client(DBConfig)
        try {
            await client.connect()
            const sql = `SELECT * FROM users WHERE username = $1 AND password = $2`
            const values = [entity.username,entity.password]
            const result = await client.query(sql,values)
            await client.end()
            returnArray = result.rows
        } catch (error) {
            console.log(error)
        }
        return returnArray
    }
    GetId = async(username)=> {
        let returnArray = null
        const client = new Client(DBConfig)
        try {
            await client.connect()
            const sql = `SELECT * FROM users WHERE username = $1`
            const values = [username]
            const result = await client.query(sql,values)
            await client.end()
            returnArray = result.rows
        } catch (error) {
            console.log(error)
        }
        return returnArray
    }
}