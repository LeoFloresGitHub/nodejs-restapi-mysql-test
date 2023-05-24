
import {pool} from '../db.js';

//ASYNC AWAIT PORQUE ESTAS PETICIONES SON ASYNCRONOS


export const getEmpleados = async (req,res)=>{

try{
    
    const [rows] = await pool.query('Select * from empleados')
    res.json(rows)
}catch (error){
    return res.status(500).json({
        message: 'Something goes wrong'
    })
}
    
}

export const getEmpleadosxID = async (req,res)=>{
    try {
        const id = req.params.id
    const [rows] = await pool.query('Select * from empleados where id ='+id)
    //const [rows] = await pool.query('Select * from empleados where id = ?',[req.params.id]) otra forma que funciona igual 
    if(rows.length <= 0) return res.status(404).json({message: 'Empleado no existe'})
    
    res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}


    
export const postEmpleados = async (req,res)=>{
try {
const {nombre,salario} = req.body
const [rows] = await pool.query('Insert into empleados (nombre,salario) values (?,?)',[nombre, salario])

res.send({
    id: rows.insertId,
    nombre,
    salario
}) //Entre llaves para que pueda devolver la promesa como un objeto json
} catch (error) {
    return res.status(500).json({
        message: 'Something goes wrong'
    })
    
}
}

export const deleteEmpleados = async (req,res)=>{
    try {
    const [result] = await pool.query('Delete from empleados where id =?',[req.params.id])
    if(result.affectedRows <= 0 ) 
    return res.status(404).json({message: 'Empleado NOT FOUND'})
   
    res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }

}

export const patchEmpleados =async (req,res)=>{
    try {
        const {id} = req.params
        const {nombre,salario} = req.body
        const [result] = await pool.query('UPDATE empleados SET nombre = IFNULL(?,nombre), salario = IFNULL(?,salario) where id = ?',[nombre,salario,id])
    
        console.log (result.affectedRows)
        if(result.affectedRows === 0)
        return res.status(404).json({message : 'No se edito empleado'})
    
    
        const [rows] = await pool.query('Select * from empleados where id ='+id)
        
        res.json(rows[0]) //Para que devuelva un solo dato {} y no un arreglo {{}}  
    } catch (error) {

         return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}