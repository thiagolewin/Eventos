import {Router} from "express"
import ProvinceService from '../services/province-service.js'
const router = Router()
const svc = new ProvinceService()
router.get('/:id',async (req,res)=> {
    let respuesta
    const returnArray = await svc.getAllAsync(req.params.id)
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
router.get('/:id/locations',async (req,res)=> {
    let respuesta
    const returnArray = await svc.getAllLocationAsync(req.params.id)
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
router.post("",async (req,res)=> {
    let respuesta
    const returnArray = await svc.createAsync(req.body)
    if(returnArray != null) {
        respuesta = res.status(200).json(returnArray)
    } else {
        respuesta = res.status(500).json("Error Interno")
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