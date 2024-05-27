import {Router} from "express"
import EventService from '../services/event-service.js'
import EventLocationService from '../services/eventLocation-service.js'
import eventEnrollment from '../services/eventEnrollment-service.js'
const router = Router()
import jwt from 'jsonwebtoken'
const svcE = new EventLocationService()
const svcES = new eventEnrollment()
const svc = new EventService()
const TokenMiddleWare = async function (req,res,next) {
    if(req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        try {
            let payloadOriginal = await jwt.verify(token,"MatiPalito" )
        } catch (error) {
            return res.status(401).json("Unauthorized")
        }
        next()
    } else {
        return res.status(401).json("Unauthorized")
    }

}
router.get('',TokenMiddleWare,async (req,res)=> {
    let respuesta
    const returnArray = await svc.getAllAsync(req.params)
    if(returnArray != null) {
        respuesta = res.status(200).json(returnArray)
    } else {
        respuesta = res.status(500).json("Error Interno")
    }
    return respuesta
})
router.post("",TokenMiddleWare,async (req,res)=> {
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

router.put("",TokenMiddleWare,async (req,res)=> {
    let respuesta
    const returnArray = await svc.updateAsync(req.body)
    if(returnArray != null) {
        respuesta = res.status(200).json(returnArray)
    } else {
        respuesta = res.status(500).json("Error Interno")
    }
    return respuesta
})
router.delete("/:id",TokenMiddleWare,async (req,res)=> {
    let respuesta
    const returnArray = await svc.DeleteByIdAsync(req.params.id)
    if(returnArray != null) {
        respuesta = res.status(200).json(returnArray)
    } else {
        respuesta = res.status(500).json("Error Interno")
    }
    return respuesta
})
router.post(":id/enrollment",TokenMiddleWare,(async (req,res)=> {
    const token = req.headers.authorization.split(' ')[1];
    let payloadOriginal = await jwt.verify(token,"MatiPalito" )
    const eventId = req.query.params.id
    const eventMax = await svcE.getAllAsyncId(eventId)
    const eventAssistance = await svc.getAllAsync(eventId)
    const svcES = await svc.getAllAsync(eventId)
    const datos = {
        "id_event" : eventId,
        "id_user" :  1,
        "description" : "muy bueno",
        "registration_date_time" : new Date(),
        "attended" : true,
        "observations" : "muy bueno",
        "rating" : 10
    }
    if(eventMax[0].max_assistance <  eventAssistance.attended || svcES[0].start_date <=new Date() || svcES[0].enabled_for_enrollment == false) {
        respuesta = res.status(400).json("Bad Request")
    } else {
        const returnArray = await svc.createAsync(datos)
        if(returnArray != null) {
            respuesta = res.status(200).json(returnArray)
        } else {
            respuesta = res.status(500).json("Error Interno")
        }
    }
}))
export default router