import EventRepository from '../repositories/event.repository.js'
export default class EventService {
    getAllAsync =  async (parametros)=> {
        const repo = new EventRepository()
        const returnArray = await repo.getAllAsync(parametros)
        return returnArray
    }
    getIdAsync =  async (id)=> {
        const repo = new EventRepository()
        const returnArray = await repo.getIdAsync(id)
        return returnArray
    }
    GetEnrollment =  async (parametros)=> {
        const repo = new EventRepository()
        const returnArray = await repo.getAllEnrollmentAsync(parametros)
        return returnArray
    }
    createAsync = async(entity)=> {
        const repo = new EventRepository()
        const returnArray = await repo.createAsync(entity)
        return returnArray
    }
    updateAsync = async(entity)=> {
        const repo = new EventRepository()
        const returnArray = await repo.updateAsync(entity)
        return returnArray
    }
    DeleteByIdAsync = async(id)=> {
        const repo = new EventRepository()
        const returnArray = await repo.DeleteByIdAsync(id)
        return returnArray
    }
    DeleteByIdEnrollmentAsync = async(id,userId)=> {
        const repo = new EventRepository()
        const returnArray = await repo.DeleteByIdEnrollmentAsync(id,userId)
        return returnArray
    }
    createEnrrollmentAsync = async(entity)=> {
        const repo = new EventRepository()
        const returnArray = await repo.createEnrrollmentAsync(entity)
        return returnArray
    }
    getEnrollment = async(query) => {
        const repo = new EventRepository()
        const returnArray = await repo.getEnrollment(query)
        return returnArray
    }
}