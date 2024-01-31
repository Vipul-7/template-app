const cloudinary = require("cloudinary").v2;
const Multer = require("multer")

require("dotenv").config({ path: "../../.env" });

const storage = new Multer.memoryStorage();

export const upload = Multer({
    storage
})

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

export const handleUpload = async (file) => {
    const res = await cloudinary.uploader.upload(file, {
        resource_type: "auto",
    })
    return res;
}

