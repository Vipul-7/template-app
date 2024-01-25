import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Template } from "./entity/Template"
import { TemplateKeyword } from "./entity/TemplateKeyword"

require("dotenv").config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: process.env.USER_NAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: true,
    logging: false,
    entities: [User, Template, TemplateKeyword],
    migrations: [],
    subscribers: [],
})
