const cloudinary = require("cloudinary").v2;
const Multer = require("multer")
import { Router } from "express";

import { Request, Response } from 'express';

interface CustomRequest extends Request {
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

router.post("/upload", upload.single("avatar"), async (req: CustomRequest, res: Response) => {
    try {
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
        const cldRes = await handleUpload(dataURI);
        res.json(cldRes);
    } catch (error) {
        console.log(error);
        res.send({
            message: error.message,
        });
    }
});

export default router;