import { Router } from "express";
import {pool} from '../db.js';
import { getEmpleados,postEmpleados,patchEmpleados,deleteEmpleados,getEmpleadosxID } from "../controllers/empleadosController.js";

const router = Router();

router.get('/empleados', getEmpleados)
router.get('/empleados/:id', getEmpleadosxID)

router.post('/empleados',postEmpleados)

router.patch('/empleados/:id',patchEmpleados)

router.delete('/empleados/:id',deleteEmpleados)

export default router  //Como es default se puede importar con otro alias
