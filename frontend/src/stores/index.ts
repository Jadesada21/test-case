import { AuthStore } from "./auth.store";
import { MovieStore } from "./movies.store";
import { createContext, useContext } from "react"


const store = {
    authStore: AuthStore.create({}),
    movieStore: MovieStore.create({ movies: [] })
}

const StoreContext = createContext(store)
export const useStore = () => useContext(StoreContext)
export default store