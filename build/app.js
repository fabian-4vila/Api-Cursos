"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const estudiantesRoutes_1 = __importDefault(require("./routes/estudiantesRoutes"));
const profesoresRoutes_1 = __importDefault(require("./routes/profesoresRoutes"));
const cursosRoutes_1 = __importDefault(require("./routes/cursosRoutes"));
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/ping', (req, res) => {
    res.send('pong');
});
app.use("/estudiantes", estudiantesRoutes_1.default);
app.use("/profesores", profesoresRoutes_1.default);
app.use("/cursos", cursosRoutes_1.default);
exports.default = app;
