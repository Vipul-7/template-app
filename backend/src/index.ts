const express = require("express");
import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "./data-source";
import { default as authRoutes } from "./routes/auth";
import { default as templateRoutes } from "./routes/template";
import { default as uploadRoutes } from "./routes/upload";

import "reflect-metadata"; // This is required for typeorm to work

AppDataSource.initialize().then(async () => {
    const app = express();

    app.use(express.json());

    app.use((req: Request, res: Response, next: NextFunction) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,PATCH,PUT");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
        if (req.method === "OPTIONS") {
            return res.sendStatus(200);
        }
        next();
    });

    app.use("/auth", authRoutes)
    app.use(templateRoutes)
    app.use(uploadRoutes)

    // app.use((error, req, res) => {
    //     const status = error.statusCode || 500;
    //     const message = error.message;
    //     res.status(status).json({ message });
    // });

    app.listen(8080, () => {
        console.log("App is running at port 8080");
    })
}).catch(error => console.log(error))
