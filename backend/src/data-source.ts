import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Template } from "./entity/Template"
import { TemplateKeyword } from "./entity/TemplateKeyword"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "vipul",
    password: "#Include9637",
    database: "templates",
    synchronize: true,
    logging: false,
    entities: [User,Template,TemplateKeyword],
    migrations: [],
    subscribers: [],
})