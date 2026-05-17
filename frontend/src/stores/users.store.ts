import { types, flow } from 'mobx-state-tree'
import { getAllUsers, createUsers, updateUsers } from '../api/user.api'
import type { User, UserInput, UserUpdateInput } from '../types/user.type'

export const UserStore = types
    .model('UserStore', {
        Users: types.array(types.model({
            id: types.number,
            username: types.string,
            email: types.string,
            role: types.string,
            created_at: types.string,
            updated_at: types.string
        })),
        isLoading: types.optional(types.boolean, false),
        error: types.maybeNull(types.string)
    })
    .actions(self => ({
        fetchUsers: flow(function* () {
            self.isLoading = true
            self.error = null
            try {
                const data: User[] = yield getAllUsers()
                self.Users = data as any
            } catch (err) {
                if (err instanceof Error) self.error = err.message
            } finally {
                self.isLoading = false
            }
        }),

        createUsers: flow(function* (user: UserInput) {
            self.isLoading = true
            self.error = null
            try {
                const data: User = yield createUsers(user)
                self.Users.unshift(data as any)
            } catch (err: unknown) {
                if (err instanceof Error) self.error = err.message
            }
        }),

        updateUsers: flow(function* (id: number, user: UserUpdateInput) {
            self.isLoading = true
            self.error = null
            try {
                const data: User = yield updateUsers(id, user)
                const index = self.Users.findIndex(u => u.id === id)
                if (index! == -1) self.Users[index] = data as any
            } catch (err: unknown) {

            } finally {
                self.isLoading = false
            }
        })
    }))