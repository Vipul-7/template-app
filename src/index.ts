const express = require("express");
import { AppDataSource } from "./data-source";
import { default as authRoutes } from "./routes/auth";

import "reflect-metadata"; // This is required for typeorm to work

AppDataSource.initialize().then(async () => {
    const app = express();

    app.use(express.json());
    app.use("/auth", authRoutes)

    // app.use((error, req, res) => {
    //     const status = error.statusCode || 500;
    //     const message = error.message;
    //     res.status(status).json({ message });
    // });

    app.listen(8080, () => {
        console.log("App is running at port 8080");
    })
}).catch(error => console.log(error))
