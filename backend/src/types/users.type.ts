export enum Role {
    manager = "manager",
    teamleader = "teamleader",
    floorstaff = "floorstaff"
}

export interface CreateUsers {
    username: string
    password: string
    email: string
}
