import { QueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { LoginInputs, SignupInputs, TemplateInputs } from "./types";

export const queryClient = new QueryClient();

export const PRODUCTION_URL = import.meta.env.VITE_PRODUCTION_API_URL;
export const LOCAL_URL = "http://localhost:8080"


export const getTemplates = async ({ pageQuery, signal }: { pageQuery: number, signal: any }) => {
    // console.log("sending a request");
    const response = await axios({
        url: `${PRODUCTION_URL}/templates/?page=${pageQuery}`,
        method: "GET",
        signal: signal
    })

    return response.data;
}

export const getUserTemplates = async ({ pageQuery, signal }: { pageQuery: number, signal: any }) => {
    const response = await axios({
        method: "GET",
        url: `${PRODUCTION_URL}/templates/user?page=${pageQuery}`,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        signal: signal
    })

    return response.data;
}

export const createTemplate = async (templateData: TemplateInputs) => {
    const response = await axios({
        url: `${PRODUCTION_URL}/template/create`,
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
        url: `${PRODUCTION_URL}/template/edit/${templateId}`,
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
        url: `${PRODUCTION_URL}/template/delete/${templateId}`,
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
            url: `${PRODUCTION_URL}/auth/login`,
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
        url: `${PRODUCTION_URL}/auth/signup`,
        method: "PUT",
        data: singupData,
    })

    return reponse.data;
}

// reset password
export const sendResetPasswordLink = async (email: string) => {
    const reponse = await axios({
        url: `${PRODUCTION_URL}/auth/reset-password/send-link`,
        method: "POST",
        data: { email },
    })

    return reponse.data;
}

export const resetPassword = async ({ password, token }: { password: string, token: string | null }) => {
    const reponse = await axios({
        url: `${PRODUCTION_URL}/auth/reset-password/?token=${token}`,
        method: "POST",
        data: { newPassword: password },
    })

    return reponse.data;
}

// google signin
export const googleSignIn = async ({ code, toast, setIsLoading }: { code: any, toast: any, setIsLoading: (state: boolean) => any }) => {
    try {
        const response = await axios({
            url: `${PRODUCTION_URL}/auth/google`,
            method: "POST",
            data: { code }
        })

        return response.data;
    }
    catch (error) {
        const errorMessage = ((error as AxiosError)?.response?.data as { message?: string })?.message ||
            'Error occured while signin with google';

        setIsLoading(false);
        toast({
            variant: "destructive",
            title: errorMessage
        })
        throw error
    }
}

// delete user
export const deleteUser = async (userId: number) => {
    const response = await axios({
        url: `${PRODUCTION_URL}/user/delete/${userId}`,
        method: "POST",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })

    return response.data;
}