import { types, flow } from 'mobx-state-tree'
import { getMe, login, logout } from '../api/auth.api'
import { type LoginResponse, type User } from '../types/auth.type'
import axios from 'axios'

const UserModel = types.model('User', {
    id: types.number,
    username: types.string,
    role: types.string
})

export const AuthStore = types
    .model('AuthStore', {
        user: types.maybeNull(UserModel),
        isAuthenticated: types.optional(types.boolean, false),
        isLoading: types.optional(types.boolean, true),
        error: types.maybeNull(types.string)
    })
    .actions(self => ({
        login: flow(function* (username: string, password: string) {
            self.isLoading = true
            self.error = null
            try {
                const data: LoginResponse = yield login({ username, password })
                self.user = data.user
                self.isAuthenticated = true
            } catch (err: unknown) {
                if (axios.isAxiosError(err) && err.response?.status === 401) {
                    self.error = "Invalid username or password"
                } else {
                    self.error = "Something went wrong"
                }
            } finally {
                self.isLoading = false
            }
        }),

        checkAuth: flow(function* () {
            self.isLoading = true
            try {
                const data: LoginResponse = yield getMe()
                self.user = data.user
                self.isAuthenticated = true
            } catch (err) {
                self.user = null
                self.isAuthenticated = false
            } finally {
                self.isLoading = false
            }
        }),

        logout: flow(function* () {
            try {
                yield logout()
            } finally {
                self.user = null
                self.isAuthenticated = false
            }
        }),

        setUser(user: User) {
            self.user = user
            self.isAuthenticated = true
        },

        clearError() {
            self.error = null
        }
    }))