import api from "./axios";
import type { User, UserInput, UserUpdateInput } from '../types/user.type'

export const getAllUsers = async (): Promise<User[]> => {
    const response = await api.get('/users')
    return response.data.data
}

export const createUsers = async (data: UserInput): Promise<User> => {
    const response = await api.post('/users', data)
    return response.data.data
}

export const updateUsers = async (id: number, data: UserUpdateInput): Promise<User> => {
    const response = await api.patch(`/users/${id}`, data)
    return response.data.data
}

