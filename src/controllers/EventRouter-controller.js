import {Router} from "express"
import EventService from '../services/event-service.js'
import EventLocationService from '../services/eventLocation-service.js'
const router = Router()
const svc = new EventService()
const svcE = new EventLocationService()
router.get('',async (req,res)=> {
    let respuesta
    const returnArray = await svc.getAllAsync(req.params)
    if(returnArray != null) {
        respuesta = res.status(200).json(returnArray)
    } else {
        respuesta = res.status(500).json("Error Interno")
    }
    return respuesta
})
router.post("",async (req,res)=> {
    let respuesta
    let capacidad = await svcE.getAllAsyncId(req.body.id_event_location)
    if(req.body.name == "" || req.body.description == "" || req.body.price < 0 || req.body.duration_in_minutes < 0 || req.body.max_assistance > capacidad[0].max_capacity) {
        respuesta = res.status(400).json("Bad Request")
    } else {
        const returnArray = await svc.createAsync(req.body)
        if(returnArray != null) {
            respuesta = res.status(200).json(returnArray)
        } else {
            respuesta = res.status(500).json("Error Interno")
        }
    }

    return respuesta
})
router.put("",async (req,res)=> {
    let respuesta
    const returnArray = await svc.updateAsync(req.body)
    if(returnArray != null) {
        respuesta = res.status(200).json(returnArray)
    } else {
        respuesta = res.status(500).json("Error Interno")
    }
    return respuesta
})
router.delete("/:id",async (req,res)=> {
    let respuesta
    const returnArray = await svc.DeleteByIdAsync(req.params.id)
    if(returnArray != null) {
        respuesta = res.status(200).json(returnArray)
    } else {
        respuesta = res.status(500).json("Error Interno")
    }
    return respuesta
})

export default router