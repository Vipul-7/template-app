import { Request, Response } from "express";
import { request } from "../util/Request";
const jwt = require("jsonwebtoken");

require("dotenv").config({ path: "../../.env" });

const auth = (req: request, res: Response, next: () => any) => {
    const authHeader = req.get("Authorization");

    if (!authHeader) {
        req.isAuth = false;
        return next();
    }

    const token = authHeader.split(" ")[1];
    let decodedToken;

    try {
        decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (err) {
        // err.statusCode = 500;
        // throw err;
        console.log(err);
        req.isAuth = false;
        return next();
    }

    // console.log(decodedToken);

    if (!decodedToken) {
        // const error = new Error("Not Authenticated");
        // statusCode = 401;
        // throw error;
        req.isAuth = false;
        return next();
    }

    req.userId = decodedToken.user.id;
    req.isAuth = true;
    next();
}

export default auth;