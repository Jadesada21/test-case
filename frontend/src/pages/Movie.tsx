import { observer } from "mobx-react-lite"
import { useStore } from "../stores"
import { useEffect } from "react"
import Loading from '../components/loading'


const MoviePage = observer(() => {
    const { movieStore, authStore } = useStore()

    useEffect(() => {
        movieStore.fetchMovies()
    }, [])

    if (movieStore.isLoading) return <Loading />

    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="flex w-[70%] my-[15%] border border-white rounded-xl shadow-lg pt-8">
                <div className="w-1/4 border-r border-white pl-4 pb-4">
                    <p>menu bar</p>
                </div>

                <div className="w-3/4 pl-10 pb-4">
                    <p>{authStore.user?.role} user name</p>
                </div>
            </div>
        </div>
    )
})

export default MoviePage