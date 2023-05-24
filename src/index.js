import {PORT} from './config.js'
import app from './app.js'


app.listen(PORT,()=>{
    console.log(`Te estoy escuchando en el puerto ${PORT}`)
})