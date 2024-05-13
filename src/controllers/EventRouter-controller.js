import {Router} from "express"
import EventService from '../services/event-service.js'
const router = Router()
const svc = new EventService()
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
export default router