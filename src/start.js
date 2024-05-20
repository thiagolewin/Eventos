import express from "express";
import cors from 'cors'
import EventRouter from "./controllers/EventRouter-controller.js"
import ProvinceRouter from "./controllers/ProvinceRouter-controller.js"
import CategoryRouter from "./controllers/CategoryRouter-controller.js"
import EventLocationRouter from "./controllers/EventLocationRouter-controller.js"
import UserRouter from "./controllers/UserRouter-controller.js"

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use("/api/event", EventRouter)
app.use("/api/province", ProvinceRouter)
app.use("/api/category", CategoryRouter)
app.use("/api/event-location", EventLocationRouter)
app.use("/api/user", UserRouter)
app.listen(port,()=> {
    console.log("qa")
})