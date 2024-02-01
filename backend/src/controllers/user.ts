import { NextFunction, Response } from "express";
import { request } from "../util/Request";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

export const deleteAccount = async (req: request, res: Response, next: NextFunction) => {
    if (!req.isAuth) {
        return res.status(401).json({
            message: "not authenticated"
        })
    }

    const userId = req.params.userId;

    try {
        const userRepository = AppDataSource.getRepository(User);

        await userRepository.delete(userId);

        return res.status(202).json({ message: "Deleted account successfully"})
    }
    catch (err) {
        return res.status(500).json({ message: "delete account failed" })
    }
}