import api from "./axios";
import type { LoginInput, LoginResponse } from "../types/auth.type";

export const login = async (data: LoginInput): Promise<LoginResponse> => {
    const response = await api.post('/login', data)
    return response.data
}

export const logout = async (): Promise<void> => {
    await api.post('/logout')
}

export const getMe = async (): Promise<LoginResponse> => {
    const response = await api.get('/users/me')
    return response.data
}