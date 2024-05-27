import {Router} from "express"
import EventLocationService from '../services/eventLocation-service.js'
import jwt from 'jsonwebtoken'
const router = Router()
const svc = new EventLocationService()
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
    const returnArray = await svc.getAllAsync()
    if(returnArray != null) {
        respuesta = res.status(200).json(returnArray)
    } else {
        respuesta = res.status(500).json("Error Interno")
    }
    return respuesta
})
router.get('/:id',TokenMiddleWare,async (req,res)=> {
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