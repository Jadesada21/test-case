export interface User {
    id: number
    username: string
    role: string
}

export interface LoginInput {
    username: string
    password: string
}

export interface LoginResponse {
    user: User
}