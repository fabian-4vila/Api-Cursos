"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Curso = void 0;
const typeorm_1 = require("typeorm");
const profesoresModel_1 = require("./profesoresModel");
const estudiantesModel_1 = require("./estudiantesModel");
let Curso = class Curso extends typeorm_1.BaseEntity {
};
exports.Curso = Curso;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Curso.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Curso.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Curso.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Curso.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Curso.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => profesoresModel_1.Profesor, (Profesor) => Profesor.cursos),
    (0, typeorm_1.JoinColumn)({ name: 'profesor_id' }),
    __metadata("design:type", profesoresModel_1.Profesor)
], Curso.prototype, "profesor", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => estudiantesModel_1.Estudiante),
    (0, typeorm_1.JoinTable)({
        name: 'cursos_estudiantes',
        joinColumn: { name: 'curso_id' },
        inverseJoinColumn: { name: 'estudiante_id' }
    }),
    __metadata("design:type", Array)
], Curso.prototype, "estudiantes", void 0);
exports.Curso = Curso = __decorate([
    (0, typeorm_1.Entity)('Cursos')
], Curso);
