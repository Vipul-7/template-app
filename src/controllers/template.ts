import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Template } from "../entity/Template";
import { request } from "../util/Request";
import { TemplateKeyword } from "../entity/TemplateKeyword";
import { User } from "../entity/User";

export const getTemplates = async (req: Request, res: Response, next: NextFunction) => {
    const templateRepository = AppDataSource.getRepository(Template);

    // pagination logic 
    const page = Number(req.query.page) || 1;

    try {
        const [templates, count] = await templateRepository.findAndCount({
            skip: (page - 1) * 10,
            take: 6
        });

        console.log(templates, count);

        return res.status(200).json({
            templates,
            count
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error
        })
    }

}

export const createTemplate = async (req: request, res: Response, next: NextFunction) => {
    if (!req.isAuth) {
        return res.status(401).json({
            message: "not authenticated"
        })
    }

    const title: string | undefined = req.body.title;
    const description: string | undefined = req.body.description;
    const keywords: string[] | undefined = req.body.keywords;

    const templateRepository = AppDataSource.getRepository(Template);
    const userRepository = AppDataSource.getRepository(User);
    const templateKeywordRepository = AppDataSource.getRepository(TemplateKeyword);

    const keywordEntities: TemplateKeyword[] = [];

    try {
        const authenticatedUser = await userRepository.findOne({
            where: {
                id: req.userId
            }
        });

        if (keywords) {
            for (const keyword of keywords) {
                let keywordEntity = await templateKeywordRepository.findOne({
                    where: {
                        value: keyword
                    }
                })

                if (!keywordEntity) {
                    keywordEntity = new TemplateKeyword();
                    keywordEntity.value = keyword;
                    await templateKeywordRepository.save(keywordEntity);
                }

                keywordEntities.push(keywordEntity);
            }
        }

        const template = new Template();

        template.title = title;
        template.description = description;
        template.creator = authenticatedUser;
        template.keywords = keywordEntities;

        const createdTemplate = await templateRepository.save(template);

        res.status(201).json({
            message: "Template created successfully",
            template: createdTemplate
        })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Error while creating template"
        })
    }
}

export const editTemplate = async (req: request, res: Response, next: NextFunction) => {
    const templateId = req.params.templateId;

    if (!req.isAuth) {
        return res.status(401).json({
            message: "not authenticated"
        })
    }

    const templateRepository = AppDataSource.getRepository(Template);
    const templateKeywordRepository = AppDataSource.getRepository(TemplateKeyword);

    const newTitle: string | undefined = req.body.title;
    const newDescription: string | undefined = req.body.description;
    const newKeywords: string[] | undefined = req.body.keywords;

    const newKeywordEntities: TemplateKeyword[] = [];

    try {
        const template = await templateRepository.findOne({
            where: {
                id: Number(templateId)
            }
        });

        if (!template) {
            return res.status(404).json({
                message: "Template not found"
            });
        }

        if (newKeywords) {
            for (const keyword of newKeywords) {
                let keywordEntity = await templateKeywordRepository.findOne({
                    where: {
                        value: keyword
                    }
                })

                if (!keywordEntity) {
                    keywordEntity = new TemplateKeyword();
                    keywordEntity.value = keyword;
                    await templateKeywordRepository.save(keywordEntity);
                }

                newKeywordEntities.push(keywordEntity);
            }
        }

        template.description = newDescription;
        template.title = newTitle;
        template.keywords = newKeywordEntities;

        const editedTemplate = await templateRepository.save(template);

        return res.status(200).json({
            message: "Template edited successfully",
            template: editedTemplate
        })

    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Error while editing template"
        })
    }
}