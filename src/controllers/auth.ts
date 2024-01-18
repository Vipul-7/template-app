const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

import { Request, Response } from "express"
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";
import { validationResult } from "express-validator";
import axios from "axios";

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

    const passwordCamparison = await bcrypt.compare(password, user.password);

    if (!passwordCamparison) {
        return res.status(401).json({ message: "E-mail or password is incorrect! please try again" });
    }

    const token = jwt.sign({
        email: user.email,
        userId: user.id
    }, "somesecretkey", {
        expiresIn: "1h"
    });

    res.status(200).json({ token })
}

// google auth

const CLIENT_ID = '94923572261-c697060agl6p91jf5t9lr39i5am9su1d.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'http://localhost:8080/auth/google/callback';
const tokenUrl = 'https://oauth2.googleapis.com/token';
const profileUrl = 'https://www.googleapis.com/oauth2/v1/userinfo';


export const intiateGoogleLoginFlowHandler = async (req: Request, res: Response, next: () => any) => {
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile email`;
    res.redirect(url);
}

export const googleResponseHandler = async (req: Request, res: Response, next) => {
    const { code } = req.query;

    try {
        // Exchange authorization code for access token
        const { data } = await axios.post(tokenUrl, {
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            code,
            redirect_uri: REDIRECT_URI,
            grant_type: 'authorization_code',
        });

        const { access_token, id_token } = data;

        // Use access_token or id_token to fetch user profile
        const { data: profile } = await axios.get(profileUrl, {
            headers: { Authorization: `Bearer ${access_token}` },
        });

        // console.log(profile);

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

            const createdUser = await userRepository.save(user);

            const token = jwt.sign({
                email: createdUser.email,
                userId: createdUser.id
            }, "somesecretkey", {
                expiresIn: "1h"
            });

            return res.status(200).json({ token })
        }
        else if (user && user.signedInWithGoogle) {
            const token = jwt.sign({
                email: user.email,
                userId: user.id
            }, "somesecretkey", {
                expiresIn: "1h"
            });

            return res.status(200).json({ token })
        }
        else if (user && !user.signedInWithGoogle) {
            return res.status(401).json({ message: "User already exists! please try again with entering email and password." });
        }
    } catch (error) {
        console.error('Error:', error);
        // res.redirect('/auth/google');
        next(error);
    }
}