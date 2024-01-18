import { Request, Response } from "express"
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";
import { validationResult } from "express-validator";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

export const putSignup = async (req: Request, res: Response, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.password;

    let hashedPassword: string;

    try {
        hashedPassword = await bcrypt.hash(password, 12);
    } catch (err) {
        err.statusCode = 500;
        err.message = "error while hash the password"
        return next(err);
    }

    try {
        const userRepository = AppDataSource.getRepository(User);

        const user = new User();
        user.email = email;
        user.firstName = firstName;
        user.lastName = lastName;
        user.password = hashedPassword;

        const createdUser = await userRepository.save(user);

        return res.status(200).json(createdUser);
    }
    catch (err) {
        err.statusCode = 500;
        err.message = "error while creating user"
        return next(err);
    }
}

export const postLogin = async (req: Request, res: Response, next: () => any) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        return res.status(422).json({ errors: validationErrors.array() })
    }

    const email = req.body.email;
    const password = req.body.password;

    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOneBy({
        email: email
    })

    if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const passwordCamparison = await bcrypt.compare(password, user.password);

    if (!passwordCamparison) {
        return res.status(401).json({ message: "password is incorrect" });
    }

    const token = jwt.sign({
        email: user.email,
        userId: user.id
    }, "somesecretkey", {
        expiresIn: "1h"
    });

    res.status(200).json({ token })
}