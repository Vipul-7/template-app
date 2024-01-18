import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Template } from "./Template"

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique : true})
    email: string

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    password: string

    @OneToMany(() => Template, template => template.creator)
    templates: Template[];
}
