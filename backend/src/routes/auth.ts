import { Router } from "express";
import { googleSignIn, postLogin, putSignup,resetPassword,resetPasswordSendLink } from "../controllers/auth";
import { body } from "express-validator";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

const router = Router();

router.put("/signup", [
    body("email").isEmail().withMessage("Please enter a valid email").custom(async (value, { req }) => {
        try {
            const userRepository = AppDataSource.getRepository(User);
            const existingUser = await userRepository.findOneBy({
                email: value
            });

            if (existingUser) {
                if (existingUser.signedInWithGoogle) {
                    return Promise.reject("Can't signup because User already signed-up with google.");
                }
                else {
                    return Promise.reject("User already exists!");
                }
            }
        } catch (error) {
            console.error(error);
            throw new Error("Internal Server Error");
        }
    }),
    body("firstName").trim().not().isEmpty().withMessage("Please enter valid first name"),
    body("lastName").trim().not().isEmpty().withMessage("Please enter a valid last name"),
    body("password").trim().isLength({ min: 5 }).withMessage("enter password more than 5 character long.")
], putSignup);
router.post("/login", [
    body("email").isEmail().withMessage("Please enter a valid email").custom(async (value, { req }) => {
        try {
            const userRepository = AppDataSource.getRepository(User);
            const existedUser = await userRepository.findOneBy({
                email: value
            });

            if (!existedUser || (existedUser && existedUser.signedInWithGoogle)) {
                return Promise.reject("E-mail or password is incorrect! please try again.");
            }
        } catch (error) {
            console.error(error);
            throw new Error("Internal Server Error");
        }
    }),
    body("password").trim().isLength({ min: 5 }).withMessage("enter password more than 5 character long.")
], postLogin);

// reset password

router.post("/reset-password/send-link", [
    body("email").isEmail().withMessage("Please enter a valid email").custom(async (value, { req }) => {
        try {
            const userRepository = AppDataSource.getRepository(User);
            const existedUser = await userRepository.findOneBy({
                email: value
            });

            if (!existedUser || (existedUser && existedUser.signedInWithGoogle)) {
                return Promise.reject("User does not exists!");
            }
        } catch (error) {
            console.error(error);
            throw new Error("Internal Server Error");
        }
    }),
], resetPasswordSendLink)

router.post("/reset-password", resetPassword);

// google auth validate tokens 

router.post("/google", googleSignIn);

export default router;