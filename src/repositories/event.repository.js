import DBConfig from './../configs/dbConfig.js'
import pkg from 'pg'
const {Client, Pool} = pkg
export default class ProvinceRepository {
    getAllAsync = async(query)=> {
        let returnArray = null
        const client = new Client(DBConfig)
        try {
            await client.connect()
            const sql = query;
            
            const result = await client.query(sql)
            await client.end()
            returnArray = result.rows
        } catch (error) {
            console.log(error)
        }
        return returnArray
    }
    getIdAsync = async(id)=> {
        let returnArray = null
        const client = new Client(DBConfig)
        try {
            await client.connect()
            const sql = "Select * From public.events Where Id = $1";
            
            const values = [id]
            const result = await client.query(sql,values)
            await client.end()
            returnArray = result.rows
        } catch (error) {
            console.log(error)
        }
        return returnArray
    }
    getAllEnrollmentAsync = async(parametros)=> {
        let returnArray = null
        const client = new Client(DBConfig)
        try {
            await client.connect()
            const sql = "Select * From public.event_enrollments Where Id = $1";
            
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
            const sql = `INSERT INTO events (name, description, id_event_category, id_event_location, start_date,duration_in_minutes,price,enabled_for_enrollment,max_assistance,id_creator_user) VALUES ($1, $2, $3, $4,$5,$6,$7,$8,$9,$10)`
            const values = [entity.name,entity.description,entity.id_event_category,entity.id_event_location,entity.start_date,entity.duration_in_minutes,entity.price,entity.enabled_for_enrollment,entity.max_assistance,entity.id_creator_user]
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
            const sql = `UPDATE public.events
            SET name=$1, description=$2, id_event_category=$3, id_event_location=$4, start_date=$5, duration_in_minutes=$6, price=$7, enabled_for_enrollment=$8, max_assistance=$9, id_creator_user=$10
            WHERE id = $11`
            const values = [entity.name,entity.description,entity.id_event_category,entity.id_event_location,entity.start_date,entity.duration_in_minutes,entity.price,entity.enabled_for_enrollment,entity.max_assistance,entity.id_creator_user,entity.id]
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
            const sql = "DELETE FROM public.events WHERE id = " + id
            const result = await client.query(sql)
            await client.end()
            returnArray = result.rows
        } catch (error) {
            console.log(error)
        }
        return returnArray
    }
    DeleteByIdEnrollmentAsync = async(id)=> {
        let returnArray = null
        const client = new Client(DBConfig)
        try {
            await client.connect()
            const sql = "DELETE FROM public.event_enrollments WHERE id = " + id
            const result = await client.query(sql)
            await client.end()
            returnArray = result.rows
        } catch (error) {
            console.log(error)
        }
        return returnArray
    }
    createEnrrollmentAsync = async(entity)=> {
        let returnArray = null
        const client = new Client(DBConfig)
        try {
            await client.connect()
            const sql = `INSERT INTO event_enrollments (id_event, id_user,description,registration_date_time,attended,observations,rating) VALUES ($1,$2,$3,$4,$5,$6,$7)`
            const values = [entity.id_event,entity.id_user,entity.description,entity.registration_date_time,entity.attended,entity.observations,entity.rating]
            const result = await client.query(sql,values)
            await client.end()
            returnArray = result.rows
        } catch (error) {
            console.log(error)
        }
        return returnArray
    }
    getEnrollment = async(query) => {
        let returnArray = null
        const client = new Client(DBConfig)
        try {
            await client.connect()
            const sql = query
            console.log(query)
            const result = await client.query(sql)
            await client.end()
            returnArray = result.rows
        } catch (error) {
            console.log(error)
        }
        return returnArray
    }
}