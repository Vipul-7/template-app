import { Router } from "express";
import { createTemplate, editTemplate, getTemplates } from "../controllers/template";
import auth from "../middleware/auth";

const router = Router();

router.get("/templates", getTemplates);
router.post("/template/create", auth, createTemplate);
router.patch("/template/edit/:templateId", auth, editTemplate);

export default router;