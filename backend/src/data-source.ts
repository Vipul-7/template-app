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
    // url: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false // Disable SSL certificate validation (be cautious with this option)
    },
    synchronize: true,
    logging: false,
    entities: [User, Template, TemplateKeyword],
    migrations: [__dirname + '/src/migration/*.ts'],
    subscribers: [],
})
