const cloudinary = require("cloudinary").v2;
const Multer = require("multer")
import { Router } from "express";
const jwt = require("jsonwebtoken");

import { Response } from 'express';
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { request } from "../util/Request";
import auth from "../middleware/auth";

interface CustomRequest extends request {
    file: {
        buffer: Buffer;
        mimetype: string;
        // Add other properties based on the actual structure of req.file
    };
}

const router = Router();

const storage = new Multer.memoryStorage();

const upload = Multer({
    storage
})

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

const handleUpload = async (file: string) => {
    try {
        const res = await cloudinary.uploader.upload(file, {
            resource_type: "auto",
        });
        return res;
    } catch (error) {
        throw new Error(`Error uploading to Cloudinary: ${error.message}`);
    }
}

router.post("/upload/avatar", auth, upload.single("avatar"), async (req: CustomRequest, res: Response) => {
    if (!req.isAuth) {
        return res.status(401).json({
            message: "not authenticated"
        })
    }

    try {
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
        const cloudRes = await handleUpload(dataURI);

        if (!cloudRes) {
            throw new Error("Error uploading to Cloudinary");
        }

        const userRepository = AppDataSource.getRepository(User);

        const user = await userRepository.findOne({
            where: {
                id: req.userId
            }
        });

        if (!user) {
            throw new Error("User not found");
        }

        user.profilePicture = cloudRes.secure_url;

        await userRepository.save(user);

        const token = jwt.sign({
            user
        }, process.env.JWT_SECRET_KEY, {
            expiresIn: "1h"
        });

        res.send({
            message: "Avatar changed successfully",
            user,
            token
        });
    } catch (error) {
        console.log(error);
        res.send({
            message: error.message,
        });
    }
});

export default router;