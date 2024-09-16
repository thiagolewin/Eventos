import {Router} from "express"
import UserService from '../services/user-service.js'
import jwt from 'jsonwebtoken'
const router = Router()
const svc = new UserService()
router.post("/register",async (req,res)=> {
    let respuesta
    if(req.body.first_name == "" || req.body.last_name == "" || req.body.password.length < 3) {
        respuesta = res.status(400).json("Bad request")
    } else {
        const returnArray = await svc.createAsync(req.body)
        if(returnArray != null) {
            respuesta = res.status(201).json(returnArray)
        } else {
            respuesta = res.status(500).json("Error Interno")
        }
        return respuesta
    }

})
router.post("/login",async (req,res)=> {
    console.log("a")
    let respuesta
        const returnArray = await svc.LoginAsync(req.body)
        if(returnArray.length != 0) {
            const secretKey = "MatiPalito"
            const options = {
                expiresIn : '1h',
                issuer : 'eventos'
            }
            const token = jwt.sign(returnArray[0],secretKey,options)
            respuesta = res.status(200).json({...returnArray[0],token})
        } else {
            respuesta = res.status(400).json("Login Incorrecto")
        }
        return respuesta
    

})
export default router