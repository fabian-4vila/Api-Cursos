import { Request, Response } from "express";
import { Curso } from "../models/cursosModel";
import { Estudiante } from "../models/estudiantesModel";
import { Profesor } from "../models/profesoresModel";

class CursosController {
    async consultar(req: Request, res: Response): Promise<void> {
        try {
            const cursos = await Curso.find({ relations: ["profesor", "estudiantes"] });
            res.status(200).json(cursos);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }

    async consultarDetalle(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const curso = await Curso.findOne({ where: { id: Number(id) }, relations: ["profesor", "estudiantes"] });
            if (curso) {
                res.status(200).json(curso);
            } else {
                res.status(404).send("Curso no encontrado");
            }
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }

    async ingresar(req: Request, res: Response): Promise<void> {
        const { nombre, descripcion, profesorId } = req.body;
        try {
            const profesor = await Profesor.findOne({ where: { id: profesorId } });
            if (!profesor) {
                res.status(404).send("Profesor no encontrado");
                return;
            }

            const nuevoCurso = Curso.create({
                nombre,
                descripcion,
                profesor,
            });

            await nuevoCurso.save();
            res.status(201).json(nuevoCurso);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }

    async borrar(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const curso = await Curso.findOne({ where: { id: Number(id) } });
            if (!curso) {
                res.status(404).send("Curso no encontrado");
                return;
            }

            await curso.remove();
            res.status(200).send("Curso eliminado exitosamente");
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }

    async actualizar(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { nombre, descripcion, profesorId } = req.body;
        try {
            const curso = await Curso.findOne({ where: { id: Number(id) } });
            if (!curso) {
                res.status(404).send("Curso no encontrado");
                return;
            }

            const profesor = profesorId ? await Profesor.findOne({ where: { id: profesorId } }) : null;
            if (profesorId && !profesor) {
                res.status(404).send("Profesor no encontrado");
                return;
            }

            curso.nombre = nombre || curso.nombre;
            curso.descripcion = descripcion || curso.descripcion;
            if (profesor) {
                curso.profesor = profesor;
            }

            await curso.save();
            res.status(200).json(curso);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }

    async asociarEstudiante(req: Request, res: Response): Promise<void> {
        const { curso_id, estudiante_id } = req.body;
        if (!curso_id || !estudiante_id) {
            res.status(400).send("cursoId y estudianteId son requeridos");
            return;
        }
        try {
            const curso = await Curso.findOne({ where: { id: Number(curso_id) }, relations: ["estudiantes"] });
            const estudiante = await Estudiante.findOne({ where: { id: Number(estudiante_id) } });

            if (!curso) {
                res.status(404).send("Curso no encontrado");
                return;
            }

            if (!estudiante) {
                res.status(404).send("Estudiante no encontrado");
                return;
            }

            curso.estudiantes = [...curso.estudiantes, estudiante];
            await curso.save();

            res.status(200).json(curso);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }
}

export default new CursosController();
