import { Request, Response } from "express";
import { request } from "../util/Request";
const jwt = require("jsonwebtoken");

const auth = (req: request, res: Response, next: () => any) => {
    const authHeader = req.get("Authorization");

    if (!authHeader) {
        req.isAuth = false;
        return next();
    }

    const token = authHeader.split(" ")[1];
    let decodedToken;

    try {
        decodedToken = jwt.verify(token, "somesecretkey");
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

    req.userId = decodedToken.userId;
    req.isAuth = true;
    next();
}

export default auth;