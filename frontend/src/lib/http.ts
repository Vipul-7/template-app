import { QueryClient } from "@tanstack/react-query";
import axios from "axios";
import { LoginInputs, SignupInputs } from "./types";

export const queryClient = new QueryClient();

export const getTemplates = async ({ pageQuery: number, signal }) => {
    const response = await axios({
        url: `http://localhost:8080/templates/?page=${pageQuery}`,
        method: "GET",
        signal
    })

    console.log(response.data);

    return response.data;
}

export const login = async (loginData: LoginInputs) => {
    const reponse = await axios({
        url: "http://localhost:8080/auth/login",
        method: "POST",
        data: loginData,
    })

    return reponse.data;
}

export const signup = async (singupData: SignupInputs) => {
    const reponse = await axios({
        url: "http://localhost:8080/auth/signup",
        method: "PUT",
        data: singupData,
    })

    return reponse.data;
}