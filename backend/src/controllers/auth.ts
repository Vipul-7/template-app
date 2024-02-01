const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";
import { validationResult } from "express-validator";
import axios from "axios";
import { OAuth2Client } from "google-auth-library";

require("dotenv").config({ path: "../../.env" });

export const putSignup = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array()[0] });
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
        // user.signedInWithGoogle = false;

        const createdUser = await userRepository.save(user);

        return res.status(200).json(createdUser);
    }
    catch (err) {
        err.statusCode = 500;
        err.message = "error while creating user"
        return next(err);
    }
}

export const postLogin = async (req: Request, res: Response, next: NextFunction) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        return res.status(422).json({ errors: validationErrors.array()[0] })
    }

    const email = req.body.email;
    const password = req.body.password;

    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOneBy({
        email: email
    })

    const passwordCamparison = await bcrypt.compare(password, user.password);

    if (!passwordCamparison) {
        return res.status(401).json({ message: "E-mail or password is incorrect! please try again" });
    }

    const token = jwt.sign({
        user
    }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1h"
    });

    res.status(200).json({ token, user })
}

// google auth

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
// const REDIRECT_URI = process.env.REDIRECT_URI;
// const tokenUrl = process.env.TOKEN_URL;
const profileUrl = process.env.PROFILE_URL;

// export const intiateGoogleLoginFlowHandler = async (req: Request, res: Response, next: NextFunction) => {
//     const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile email`;
//     res.redirect(url);
// }

const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, "postmessage")

export const googleSignIn = async (req: Request, res: Response, next: NextFunction) => {
    const code = req.body.code;
    const { tokens } = await oAuth2Client.getToken(code);

    const { data: profile } = await axios.get(profileUrl, {
        headers: { Authorization: `Bearer ${tokens.access_token}` },
    });

    try {

        const userRepository = AppDataSource.getRepository(User);

        const user = await userRepository.findOneBy({
            email: profile.email,
        })

        if (!user) {
            const user = new User();
            user.email = profile.email;
            user.firstName = profile.given_name;
            user.lastName = profile.family_name;
            user.signedInWithGoogle = true;
            user.profilePicture = profile.picture;

            await userRepository.save(user);

            const token = jwt.sign({
                user
            }, process.env.JWT_SECRET_KEY, {
                expiresIn: "1h"
            });

            return res.status(200).json({ message: "Signup Successfully", token, user: user })
        }
        else if (user && user.signedInWithGoogle) {
            const token = jwt.sign({
                user
            }, process.env.JWT_SECRET_KEY, {
                expiresIn: "1h"
            });

            return res.status(200).json({ message: "Signin Successfully", token, user: user })
        }
        else if (user && !user.signedInWithGoogle) {
            return res.status(401).json({ message: "User already exists! please try again with entering email and password manually." });
        }
    } catch (error) {
        console.error('Error:', error);
        // res.redirect('/auth/google');
        next(error);
    }
}