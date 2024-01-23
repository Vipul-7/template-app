export interface LoginInputs {
    email?: string,
    password?: string,
}

export interface SignupInputs {
    email?: string,
    password?: string,
    firstName?: string,
    lastName?: string
}

export interface TemplateData {
    id: number,
    title: string,
    description: string,
    creator: User,
    keywords: TemplateKeyword[],
}

export interface User {
    id: number,
    email: string,
    firstName: string,
    lastName: string,
    templates: TemplateData[],
}

export interface TemplateKeyword {
    id: number,
    value: string,
}
export interface TokenData {
    email?: string,
    exp?: number,
    iat?: number,
    userId?: number
}