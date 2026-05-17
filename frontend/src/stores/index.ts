import { AuthStore } from "./auth.store";
import { MovieStore } from "./movies.store";
import { createContext, useContext } from "react"


const store = {
    authStore: AuthStore.create({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
    }),
    movieStore: MovieStore.create({
        movies: [],
        isLoading: false,
        error: null
    })
}

export type RootStore = typeof store
export const StoreContext = createContext<RootStore>(store)
export const useStore = () => useContext(StoreContext)
export default store