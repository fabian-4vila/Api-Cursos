import express  from "express";
import cursosControllers from  '../controllers/cursosControllers';
const router = express.Router();


router.get('/',cursosControllers.consultar);

router.post('/',cursosControllers.ingresar);
router.post('/registraEstudiante',cursosControllers.asociarEstudiante);

router.route('/:id')
.get(cursosControllers.consultarDetalle)
.put(cursosControllers.actualizar)
.delete(cursosControllers.borrar);

export default router;