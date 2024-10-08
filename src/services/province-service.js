import ProvinceRepository from '../repositories/province.repository.js'
export default class EventService {
    getAllAsync =  async ()=> {
        const repo = new ProvinceRepository()
        const returnArray = await repo.getAllAsync()
        return returnArray
    }
    getAllAsyncId =  async (parametros)=> {
        const repo = new ProvinceRepository()
        const returnArray = await repo.getAllAsyncId(parametros)
        return returnArray
    }
    getAllLocationAsync =  async (parametros)=> {
        const repo = new ProvinceRepository()
        const returnArray = await repo.getAllLocationAsync(parametros)
        return returnArray
    }
    createAsync = async(entity)=> {
        const repo = new ProvinceRepository()
        const returnArray = await repo.createAsync(entity)
        return returnArray
    }
    updateAsync = async(entity)=> {
        const repo = new ProvinceRepository()
        const returnArray = await repo.updateAsync(entity)
        return returnArray
    }
    DeleteByIdAsync = async(id)=> {
        const repo = new ProvinceRepository()
        const returnArray = await repo.DeleteByIdAsync(id)
        return returnArray
    }
}