import EventLocationRepository from '../repositories/eventLocation.repository.js'
export default class EventService {
    getAllAsync =  async ()=> {
        const repo = new EventLocationRepository()
        const returnArray = await repo.getAllAsync()
        return returnArray
    }
    getAllAsyncId =  async (parametros)=> {
        const repo = new EventLocationRepository()
        const returnArray = await repo.getAllAsyncId(parametros)
        return returnArray
    }
}