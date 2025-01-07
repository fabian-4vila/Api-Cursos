import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Profesor } from "./profesoresModel";
import { Estudiante } from "./estudiantesModel";

@Entity('Cursos')
export class Curso extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: Number;

    @Column()
    nombre: String;

    @Column('text')
    descripcion: String;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(()=> Profesor, (Profesor) =>Profesor.cursos)
    @JoinColumn({name: 'profesor_id'})
    profesor:Profesor

    @ManyToMany(()=> Estudiante)
    @JoinTable({
        name: 'cursos_estudiantes',
        joinColumn:{name: 'curso_id'},
        inverseJoinColumn: {name:'estudiante_id'}
    })
    estudiantes:Estudiante[];
}