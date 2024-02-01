import { QueryClient } from "@tanstack/react-query";
import axios from "axios";
import { LoginInputs, SignupInputs, TemplateData, TemplateInputs } from "./types";

export const queryClient = new QueryClient();

export const getTemplates = async ({ pageQuery, signal }: { pageQuery: number, signal: any }) => {
    const response = await axios({
        url: `http://localhost:8080/templates/?page=${pageQuery}`,
        method: "GET",
        signal: signal
    })

    return response.data;
}

export const getUserTemplates = async ({ pageQuery, signal }: { pageQuery: number, signal: any }) => {
    const response = await axios({
        method: "GET",
        url: `http://localhost:8080/templates/user?page=${pageQuery}`,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        signal: signal
    })

    return response.data;
}

export const createTemplate = async (templateData: TemplateInputs) => {
    const response = await axios({
        url: "http://localhost:8080/template/create",
        method: "POST",
        data: {
            title: templateData.title,
            description: templateData.description,
            keywords: templateData.tags
        },
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })

    return response.data;
}

export const editTemplate = async ({ templateId, title, description, tags }: { templateId: number } & TemplateInputs) => {
    const response = await axios({
        url: `http://localhost:8080/template/edit/${templateId}`,
        method: "PATCH",
        data: {
            title, description, keywords: tags
        },
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })

    return response.data;
}

export const deleteTemplate = async (templateId: number) => {
    const response = await axios({
        url: `http://localhost:8080/template/delete/${templateId}`,
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    });

    return response.data;
}

export const login = async (loginData: LoginInputs) => {
    try {
        const reponse = await axios({
            url: "http://localhost:8080/auth/login",
            method: "POST",
            data: loginData,
        })

        return reponse.data;
    }
    catch (axiosError) {
        throw axiosError;
    }
}

export const signup = async (singupData: SignupInputs) => {
    const reponse = await axios({
        url: "http://localhost:8080/auth/signup",
        method: "PUT",
        data: singupData,
    })

    return reponse.data;
}

export const googleSignIn = async ({ code }: { code: any }) => {
    try {
        const response = await axios({
            url: "http://localhost:8080/auth/google",
            method: "POST",
            data: { code }
        })

        return response.data;
    }
    catch (error) {
        console.log(error);
        throw error
    }
}

export const deleteUser = async (userId: number) => {
    const response = await axios({
        url: `http://localhost:8080/user/delete/${userId}`,
        method: "POST",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })

    return response.data;
}