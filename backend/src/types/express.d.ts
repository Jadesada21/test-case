import { Role } from './users.type'

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: number,
                username: string,
                role: Role
            }
        }
    }
}
