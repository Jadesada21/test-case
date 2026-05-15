export type Role = "manager" | "teamleader" | "floorstaff"

export interface CreateUsers {
    username: string
    password: string
    email: string
}
