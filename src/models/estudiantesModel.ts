import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity('estudiantes')
export class Estudiante {

    @PrimaryGeneratedColumn()
    id:Number;

    @Column()
    dni: String;

    @Column()
    nombre: String;

    @Column()
    apellido:String;

    @Column()
    email: String;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
};