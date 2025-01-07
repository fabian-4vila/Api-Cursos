import { Request, Response } from "express";
import {Curso} from "../models/cursosModel"
import { Estudiante } from "../models/estudiantesModel";
import { Profesor } from "../models/profesoresModel";



class CursosController {
    constructor() {
        
    }
    async consultar(req: Request, res: Response){
        try {
            const data = await Curso.find({relations:{profesor:true, estudiantes:true}});
            res.status(200).json(data);
            if (!data || data.length === 0) {
                return res.status(404).send('No se encontraron Cursos.');
            }
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message)
            }
        }
    };
    async consultarDetalle(req: Request, res: Response) {
        const {id} = req.params;
        try {
            const registro = await Curso.findOne({where: {id:Number(id)},relations: {profesor:true, estudiantes:true}});
            if (!registro) {
                return res.status(404).send('Curso no encontrado')
            }
            res.status(200).json(registro);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message)
            }
        }
    };
    async ingresar(req: Request, res: Response){
        try {
            const {profesor_id} = req.body;
            const profesor = await Profesor.findOneBy({id:Number(profesor_id)});
            if (!profesor) {
                throw new Error('Profesor no encontrado')
            }
            const registro = await Curso.save(req.body);
            res.status(201).json(registro);
            
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message)
            }
        }
    };
    
    async borrar(req: Request, res: Response){
        const { id } = req.params;
        try {
            const registro = await Curso.findOneBy({id:Number(id)});
            if (!registro) {
                throw new Error('Curso no encontrado')
            }
            await Curso.delete({id:Number(id)});
            res.send(204);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message)
            }
        }
    };
    async actualizar(req: Request, res: Response){
        const {id} = req.params;
        try {
            const {profesor_id, ...data} = req.body;
            const profesor = await Profesor.findOneBy({id:Number(profesor_id)});
            if (!profesor) {
                return res.status(404).send('Profesor no encontrado.')
            }
            const registro = await Curso.findOneBy({id:Number(id)});
            if (!registro) {
                return res.status(404).send('Curso no encontrado.')
            }
            await Curso.update({id:Number(id)}, {...data, profesor: {id:Number(profesor_id)}});
            const registroActualizado = await Curso.findOne({where: {id:Number(id)},relations: {profesor:true}});
            res.status(200).json(registroActualizado);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message)
            }
        }
    };
    async asociarEstudiante(req: Request, res: Response): Promise<void> {
        const { id } = req.params; // id del curso
        try {
            const { estudiante_id, curso_id } = req.body;
    
            // Buscar al estudiante por su id
            const estudiante = await Estudiante.findOneBy({ id: Number(estudiante_id) });
            if (!estudiante) {
                res.status(404).send('Estudiante no encontrado.');
                return
            }
    
            // Buscar el curso por su id
            const curso = await Curso.findOne({ where: { id: Number(curso_id) }, relations: ['estudiantes'] });
            if (!curso) {
                res.status(404).send('Curso no encontrado.');
                return
            }
    
            // Agregar al estudiante al curso (si no está ya en la lista)
            curso.estudiantes = curso.estudiantes || [];
            if (!curso.estudiantes.some((e) => e.id === estudiante.id)) {
                curso.estudiantes.push(estudiante);
            }
    
            // Guardar el curso con el estudiante asociado
            const registro = await curso.save(); // Guardar directamente la instancia de curso
    
            res.status(200).json(registro);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }
};


export default  new CursosController();


