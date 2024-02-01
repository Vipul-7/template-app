import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { User } from "./User"
import { TemplateKeyword } from "./TemplateKeyword"

@Entity()
export class Template {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    description: string

    @ManyToMany(() => TemplateKeyword, { onDelete: "CASCADE" })
    @JoinTable()
    keywords: TemplateKeyword[];

    @ManyToOne(() => User, user => user.templates)
    @JoinColumn({ name: "creatorId" })
    creator: User

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}

// Difference between join table and join column is that join table is used when we have many to many relationship between two tables and join column is used when we have many to one relationship between two tables.