import { Request, Response } from "express";
import { Profesor } from "../models/profesoresModel";



class ProfesorController {
    constructor(){

    }
    async consultar(req: Request, res: Response): Promise<void>{
        try {
            const data = await Profesor.find();
            res.status(200).json(data);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message)
            }
        }
    };
    async consultarDetalle(req: Request, res: Response): Promise<void> {
        const {id} = req.params;
        try {
            const registro = await Profesor.findOneBy({id:Number(id)});
            if (!registro) {
                throw new Error('Profesor no encontrado')
            }
            res.status(200).json(registro);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message)
            }
        }
    };
    async ingresar(req: Request, res: Response): Promise<void>{
        try {
            const registro = await Profesor.save(req.body);
            res.status(201).json(registro);
            
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message)
            }
        }
    };
    async actualizar(req: Request, res: Response): Promise<void>{
        const {id} = req.params
        try {
            const registro = await Profesor.findOneBy({id:Number(id)});
            if (!registro) {
                throw new Error('Profesor no encontrado')
            }
            await Profesor.update({id:Number(id)}, req.body);
            const registroActualizado = await Profesor.findOneBy({id:Number(id)});
            res.status(200).json(registroActualizado);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message)
            }
        }
    };
    async borrar(req: Request, res: Response): Promise<void>{
        const { id } = req.params
        try {
            const registro = await Profesor.findOneBy({id:Number(id)});
            if (!registro) {
                throw new Error('Profesor no encontrado')
            }
            await Profesor.delete({id:Number(id)});
            res.send(204);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message)
            }
        }
    };
};


export default new ProfesorController();