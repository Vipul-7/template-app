import { Router } from "express";
import { createTemplate, deleteTemplate, editTemplate, getTemplates } from "../controllers/template";
import auth from "../middleware/auth";
import { body } from "express-validator";

const router = Router();

router.get("/templates", getTemplates);

router.post("/template/create", auth, [
    body("title").isLength({ min: 5 }).withMessage("Title must be at least 5 characters long"),
    body("description").isLength({ min: 10 }).withMessage("Description must be at least 10 characters long"),
    body("keywords").isArray({ min: 1, max: 3 }).withMessage("Keywords must be between 1 and 3")
], createTemplate);

router.patch("/template/edit/:templateId", auth, editTemplate);

router.post("/template/delete/:templateId", auth, deleteTemplate);

export default router;