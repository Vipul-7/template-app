import { Request } from "express";

export type request = Request & {
    isAuth: boolean,
    userId: number
}