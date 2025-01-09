"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const profesoresController_1 = __importDefault(require("../controllers/profesoresController"));
const router = express_1.default.Router();
router.get('/', profesoresController_1.default.consultar);
router.post('/', profesoresController_1.default.ingresar);
router.route('/:id')
    .get(profesoresController_1.default.consultarDetalle)
    .put(profesoresController_1.default.actualizar)
    .delete(profesoresController_1.default.borrar);
exports.default = router;
