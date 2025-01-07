import { Request, Response } from "express";
import {Curso} from "../models/cursosModel"
import { Estudiante } from "../models/estudiantesModel";
import { Profesor } from "../models/profesoresModel";



class CursosController {
    constructor() {
        
    }
    async consultar(req: Request, res: Response){
        try {
            const data = await Curso.find();
            res.status(200).json(data);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message)
            }
        }
    };
    async consultarDetalle(req: Request, res: Response) {
        const {id} = req.params;
        try {
            const registro = await Curso.findOneBy({id:Number(id)});
            if (!registro) {
                throw new Error('Curso no encontrado')
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
    async actualizar(req: Request, res: Response){
        const {id} = req.params
        try {
            const {profesor_id} = req.body;
            const profesor = await Profesor.findOneBy({id:Number(profesor_id)});
            if (!profesor) {
                throw new Error('Profesor no encontrado')
            }
            const registro = await Curso.findOneBy({id:Number(id)});
            if (!registro) {
                throw new Error('Curso no encontrado')
            }
            await Curso.update({id:Number(id)}, req.body);
            const registroActualizado = await Curso.findOneBy({id:Number(id)});
            res.status(200).json(registroActualizado);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message)
            }
        }
    };
    async borrar(req: Request, res: Response){
        const { id } = req.params
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
    
    asociarEstudiante(req:Request , res: Response){
        const { id } = req.params
        try {
            res.send('Asociar estudiante')
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message)
            }
        }
    };
};


export default  new CursosController();


