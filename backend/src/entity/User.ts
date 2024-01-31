import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from "typeorm"
import { Template } from "./Template"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    email: string

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column({ default: false })
    isEmailVerified: boolean

    @Column({ nullable: true })
    password: string

    @Column({ default: false })
    signedInWithGoogle: boolean

    @OneToMany(() => Template, template => template.creator)
    templates: Template[];

    @CreateDateColumn()
    createdAt: Date
}
