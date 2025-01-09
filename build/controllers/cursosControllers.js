"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const cursosModel_1 = require("../models/cursosModel");
const estudiantesModel_1 = require("../models/estudiantesModel");
const profesoresModel_1 = require("../models/profesoresModel");
class CursosController {
    consultar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cursos = yield cursosModel_1.Curso.find({ relations: ["profesor", "estudiantes"] });
                res.status(200).json(cursos);
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).send(err.message);
                }
            }
        });
    }
    consultarDetalle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const curso = yield cursosModel_1.Curso.findOne({ where: { id: Number(id) }, relations: ["profesor", "estudiantes"] });
                if (curso) {
                    res.status(200).json(curso);
                }
                else {
                    res.status(404).send("Curso no encontrado");
                }
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).send(err.message);
                }
            }
        });
    }
    ingresar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre, descripcion, profesorId } = req.body;
            try {
                const profesor = yield profesoresModel_1.Profesor.findOne({ where: { id: profesorId } });
                if (!profesor) {
                    res.status(404).send("Profesor no encontrado");
                    return;
                }
                const nuevoCurso = cursosModel_1.Curso.create({
                    nombre,
                    descripcion,
                    profesor,
                });
                yield nuevoCurso.save();
                res.status(201).json(nuevoCurso);
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).send(err.message);
                }
            }
        });
    }
    borrar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const curso = yield cursosModel_1.Curso.findOne({ where: { id: Number(id) } });
                if (!curso) {
                    res.status(404).send("Curso no encontrado");
                    return;
                }
                yield curso.remove();
                res.status(200).send("Curso eliminado exitosamente");
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).send(err.message);
                }
            }
        });
    }
    actualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { nombre, descripcion, profesorId } = req.body;
            try {
                const curso = yield cursosModel_1.Curso.findOne({ where: { id: Number(id) } });
                if (!curso) {
                    res.status(404).send("Curso no encontrado");
                    return;
                }
                const profesor = profesorId ? yield profesoresModel_1.Profesor.findOne({ where: { id: profesorId } }) : null;
                if (profesorId && !profesor) {
                    res.status(404).send("Profesor no encontrado");
                    return;
                }
                curso.nombre = nombre || curso.nombre;
                curso.descripcion = descripcion || curso.descripcion;
                if (profesor) {
                    curso.profesor = profesor;
                }
                yield curso.save();
                res.status(200).json(curso);
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).send(err.message);
                }
            }
        });
    }
    asociarEstudiante(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { curso_id, estudiante_id } = req.body;
            if (!curso_id || !estudiante_id) {
                res.status(400).send("cursoId y estudianteId son requeridos");
                return;
            }
            try {
                const curso = yield cursosModel_1.Curso.findOne({ where: { id: Number(curso_id) }, relations: ["estudiantes"] });
                const estudiante = yield estudiantesModel_1.Estudiante.findOne({ where: { id: Number(estudiante_id) } });
                if (!curso) {
                    res.status(404).send("Curso no encontrado");
                    return;
                }
                if (!estudiante) {
                    res.status(404).send("Estudiante no encontrado");
                    return;
                }
                curso.estudiantes = [...curso.estudiantes, estudiante];
                yield curso.save();
                res.status(200).json(curso);
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).send(err.message);
                }
            }
        });
    }
}
exports.default = new CursosController();
