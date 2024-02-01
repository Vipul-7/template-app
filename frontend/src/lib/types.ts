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

export interface TemplateInputs {
    title?: string,
    description?: string,
    tags?: string[]
}

export interface TemplateData {
    id: number,
    title: string,
    description: string,
    creator: User,
    keywords: TemplateKeyword[],
    createdAt: string,
    updatedAt: string,
}

export interface User {
    id: number,
    email: string,
    firstName: string,
    lastName: string,
    templates: TemplateData[],
    isEmailVerified: boolean,
    profilePicture: string
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

export interface UserDetails {
    id: number,
    email: string,
    firstName: string,
    lastName: string,
    isEmailVerified: boolean,
    profilePicture: string
}