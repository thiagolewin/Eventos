import {Router} from "express"
import EventLocationService from '../services/eventLocation-service.js'
const router = Router()
const svc = new EventLocationService()
router.get('',async (req,res)=> {
    let respuesta
    const returnArray = await svc.getAllAsync()
    if(returnArray != null) {
        respuesta = res.status(200).json(returnArray)
    } else {
        respuesta = res.status(500).json("Error Interno")
    }
    return respuesta
})
router.get('/:id',async (req,res)=> {
    let respuesta
    const returnArray = await svc.getAllAsyncId(req.params.id)
    if(returnArray.length == 0){
        respuesta = res.status(404).json("Array vacio")
    }
    else if(returnArray != null) {
        respuesta = res.status(200).json(returnArray)
    }
    else {
        respuesta = res.status(500).json("Error Interno")
    }
    return respuesta
})
export default router