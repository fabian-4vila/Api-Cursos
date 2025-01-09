"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const estudiantesController_1 = __importDefault(require("../controllers/estudiantesController"));
const router = express_1.default.Router();
router.get('/', estudiantesController_1.default.consultar);
router.post('/', estudiantesController_1.default.ingresar);
router.route('/:id')
    .get(estudiantesController_1.default.consultarDetalle)
    .put(estudiantesController_1.default.actualizar)
    .delete(estudiantesController_1.default.borrar);
exports.default = router;
