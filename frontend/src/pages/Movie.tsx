import { observer } from "mobx-react-lite"
import { useStore } from "../store/"
import { useEffect, useState } from "react"
import Loading from '../components/Loading'
import { Role } from "../types/user.type"
import { MovieModal } from "../components/MovieModal"
import { useNavigate } from "react-router-dom"


const MoviePage = observer(() => {
    const { movieStore, authStore } = useStore()
    const navigate = useNavigate()

    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        movieStore.fetchMovies()
    }, [])

    const handleLogout = async () => {
        await authStore.logout()
        navigate("/")
    }

    if (movieStore.isLoading) return <Loading />


    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="flex w-[70%] my-[15%] border border-white rounded-xl shadow-lg pt-8">
                <div className="w-1/4 border-r border-white mb-4">
                    <div className="flex justify-center pt-8">
                        <p>Dashboard</p>
                    </div>
                </div>

                <div className="w-3/4 pl-10 pb-4 pr-8">
                    <div className="flex justify-between items-center">
                        <div className="font-bold">
                            <p className="">Username: {authStore.user?.username} Manager1</p>
                            <p className="">Role: {authStore.user?.role} Manager</p>
                        </div>

                        <button
                            className="border p-3 rounded-2xl bg-red-400 font-bold"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>

                    <div className="pt-8">
                        <button
                            className="border p-4 rounded-2xl bg-green-700 font-bold"
                            onClick={() => setIsModalOpen(true)}
                        >
                            Create Movie +
                        </button>
                    </div>

                    {movieStore.movies.map(movie => (
                        <div key={movie.id}>
                            <p>{movie.title}</p>
                            <p>{movie.rating}</p>
                            <p>{movie.year_released}</p>
                            <p>{movie.created_by.role}</p>

                            {authStore.user?.role === Role.manager && (
                                <button onClick={() => movieStore.deleteMovie(movie.id)}
                                >
                                    Delete
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <MovieModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    )
})

export default MoviePage