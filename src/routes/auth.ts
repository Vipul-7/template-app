import { Router } from "express";
import { postLogin, putSignup } from "../controllers/auth";
import { body } from "express-validator";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

const router = Router();

router.put("/signup", [
    body("email").isEmail().withMessage("Please enter a valid email").custom(async (value, { req }) => {
        try {
            const userRepository = AppDataSource.getRepository(User);
            const existedUser = await userRepository.findOneBy({
                email: value
            });

            if (existedUser) {
                return Promise.reject("E-mail already exists!");
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

            if (!existedUser) {
                return Promise.reject("E-mail not exists!");
            }
        } catch (error) {
            console.error(error);
            throw new Error("Internal Server Error");
        }
    }),
    body("password").trim().isLength({ min: 5 }).withMessage("enter password more than 5 character long.")
], postLogin);

export default router;