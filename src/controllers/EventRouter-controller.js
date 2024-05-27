import {Router} from "express"
import EventService from '../services/event-service.js'
import EventLocationService from '../services/eventLocation-service.js'
import UserService from "../services/user-service.js"
const router = Router()
import jwt from 'jsonwebtoken'
const svcE = new EventLocationService()
const svc = new EventService()
const svu = new UserService()
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
router.delete("/:id/enrollment",TokenMiddleWare,async (req,res)=> {
    let respuesta
    const returnArray = await svc.DeleteByIdEnrollmentAsync(req.params.id)
    const event = await svc.getAllAsync(eventId);
    if(returnArray != null || new Date(event[0].start_date) <= new Date()) {
        respuesta = res.status(200).json(returnArray)
    } else {
        respuesta = res.status(500).json("Error Interno")
    }
    return respuesta
})
router.post("/:id/enrollment", TokenMiddleWare, async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    let payloadOriginal = await jwt.verify(token, "MatiPalito");
    const eventId = req.params.id; 
    const event = await svc.getAllAsync(eventId);
    const idUser = await svu.GetId(payloadOriginal.username)
    const svcES = await svc.GetEnrollment(eventId);
    const datos = {
        "id_event": eventId,
        "id_user": idUser[0].id,
        "description": "muy bueno",
        "registration_date_time": new Date(),
        "attended": 1,
        "observations": "muy bueno",
        "rating": 10
    };
    if (event[0].max_assistance < svcES.length || new Date(event[0].start_date) <= new Date() || event[0].enabled_for_enrollment == 0) {
        res.status(400).json("Bad Request"); 
    } else {
        const returnArray = await svc.createEnrrollmentAsync(datos);
        if (returnArray != null) {
            res.status(200).json(returnArray); 
        } else {
            res.status(500).json("Error Interno"); 
        }
    }
});

export default router