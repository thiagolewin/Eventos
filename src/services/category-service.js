import CategoryRepository from '../repositories/category.repository.js'
export default class  {
    getAllAsync =  async ()=> {
        const repo = new CategoryRepository()
        const returnArray = await repo.getAllAsync()
        return returnArray
    }
    getAllAsyncId =  async (parametros)=> {
        const repo = new CategoryRepository()
        const returnArray = await repo.getAllAsyncId(parametros)
        return returnArray
    }
    createAsync = async(entity)=> {
        const repo = new CategoryRepository()
        const returnArray = await repo.createAsync(entity)
        return returnArray
    }
    updateAsync = async(entity)=> {
        const repo = new CategoryRepository()
        const returnArray = await repo.updateAsync(entity)
        return returnArray
    }
    DeleteByIdAsync = async(id)=> {
        const repo = new CategoryRepository()
        const returnArray = await repo.DeleteByIdAsync(id)
        return returnArray
    }
}