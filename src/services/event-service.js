import EventRepository from '../repositories/event.repository.js'
export default class EventService {
    getAllAsync =  async (parametros)=> {
        const repo = new EventRepository()
        const returnArray = await repo.getAllAsync(parametros)
        return returnArray
    }
}