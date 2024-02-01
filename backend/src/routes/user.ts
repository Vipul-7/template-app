import { Router } from "express";
import { deleteAccount } from "../controllers/user";
import auth from "../middleware/auth";

const router = Router();

router.post("/delete/:userId", auth, deleteAccount);

export default router;