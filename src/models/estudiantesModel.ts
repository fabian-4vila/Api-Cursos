import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity('estudiantes')
export class Estudiante extends BaseEntity {

    @PrimaryGeneratedColumn()
    id:Number;

    @Column()
    dni: string;

    @Column()
    nombre: string;

    @Column()
    apellido:string;

    @Column()
    email: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
};