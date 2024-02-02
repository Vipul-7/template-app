const nodemailer = require("nodemailer");
require("dotenv").config();

export const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.APP_USER,
        pass: process.env.APP_PASSWORD
    }
});

export const sendMail = async (mailOptions) => {
    try {
        await transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('Email sent');
            transporter.close();
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
}