"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cursosControllers_1 = __importDefault(require("../controllers/cursosControllers"));
const router = express_1.default.Router();
router.get('/', cursosControllers_1.default.consultar);
router.post('/', cursosControllers_1.default.ingresar);
router.post('/registraEstudiante', cursosControllers_1.default.asociarEstudiante);
router.route('/:id')
    .get(cursosControllers_1.default.consultarDetalle)
    .put(cursosControllers_1.default.actualizar)
    .delete(cursosControllers_1.default.borrar);
exports.default = router;
