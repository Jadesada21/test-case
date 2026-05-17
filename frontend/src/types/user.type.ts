export const Role = {
    manager: "manager",
    teamleader: "teamleader",
    floorstaff: "floorstaff"
} as const

export type Role = typeof Role[keyof typeof Role]

export interface User {
    username: string
    role: string
}

export interface UserInput {
    username: string
    password: string
    email: string
    role: Role
}

interface UpdateUser {
    username: string
    password: string
    email: string
    role: Role
}

export type UserUpdateInput = Partial<UpdateUser>