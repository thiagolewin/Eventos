import EventRepository from '../repositories/event.repository.js'
export default class EventService {
    getAllAsync =  async (parametros)=> {
        const repo = new EventRepository()
        const returnArray = await repo.getAllAsync(parametros)
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
    createEnrrollmentAsync = async(entity)=> {
        const repo = new EventRepository()
        const returnArray = await repo.createAsync(entity)
        return returnArray
    }
}