import { observer } from "mobx-react-lite"
import { useStore } from "../stores"
import { useEffect } from "react"
import Loading from '../components/loading'


const MoviePage = observer(() => {
    const { movieStore } = useStore()

    useEffect(() => {
        movieStore.fetchMovies()
    }, [])

    if (movieStore.isLoading) return <Loading />

    return (
        <div>
            Hello Movie
        </div>
    )
})

export default MoviePage