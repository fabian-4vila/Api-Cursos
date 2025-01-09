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
const profesoresModel_1 = require("../models/profesoresModel");
class ProfesorController {
    constructor() {
    }
    consultar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield profesoresModel_1.Profesor.find();
                res.status(200).json(data);
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).send(err.message);
                }
            }
        });
    }
    ;
    consultarDetalle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const registro = yield profesoresModel_1.Profesor.findOneBy({ id: Number(id) });
                if (!registro) {
                    throw new Error('Profesor no encontrado');
                }
                res.status(200).json(registro);
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).send(err.message);
                }
            }
        });
    }
    ;
    ingresar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const registro = yield profesoresModel_1.Profesor.save(req.body);
                res.status(201).json(registro);
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).send(err.message);
                }
            }
        });
    }
    ;
    actualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const registro = yield profesoresModel_1.Profesor.findOneBy({ id: Number(id) });
                if (!registro) {
                    throw new Error('Profesor no encontrado');
                }
                yield profesoresModel_1.Profesor.update({ id: Number(id) }, req.body);
                const registroActualizado = yield profesoresModel_1.Profesor.findOneBy({ id: Number(id) });
                res.status(200).json(registroActualizado);
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).send(err.message);
                }
            }
        });
    }
    ;
    borrar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const registro = yield profesoresModel_1.Profesor.findOneBy({ id: Number(id) });
                if (!registro) {
                    throw new Error('Profesor no encontrado');
                }
                yield profesoresModel_1.Profesor.delete({ id: Number(id) });
                res.send(204);
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).send(err.message);
                }
            }
        });
    }
    ;
}
;
exports.default = new ProfesorController();
