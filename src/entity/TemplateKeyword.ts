import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Template } from "./Template";

@Entity()
export class TemplateKeyword {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    value: string;

    @ManyToMany(() => Template, template => template.keywords)
    templates: Template[];
}
