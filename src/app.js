
import express from "express";

import empleadosRouter from './routes/empleadosRouter.js';

import {PORT} from './config.js'

const app = express()

//Antes de que llegue a las rutas es importante que la app pueda leer JSON como los pasados en el POST
app.use(express.json())

//Utilizando el router
app.use('/api/',empleadosRouter)



//SI no encuentra una direccion valida entonces...
app.use((req,res,next)=>{
    res.status(404).json({
        message: 'End point not found'
    })
})

export default app;