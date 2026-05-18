import { observer } from "mobx-react-lite"
import { useStore } from "../store/"
import { useEffect, useState } from "react"
import Loading from '../components/Loading'
import { Role } from "../types/user.type"
import { MovieModal } from "../components/MovieModal"
import { useNavigate } from "react-router-dom"
import { formatDate } from "../components/FormateDate"


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
                    <div className="flex justify-center">
                        <p className="font-bold pt-3">Dashboard</p>
                    </div>
                </div>

                <div className="w-3/4 pl-10 pb-4 pr-8">
                    <div className="flex justify-between items-center">
                        <div className="font-bold">
                            <p >Username: <span className="capitalize">{authStore.user?.username}</span> </p>
                            <p >Role: <span className="capitalize">{authStore.user?.role}</span></p>
                        </div>

                        <button
                            className="border p-3 rounded-2xl bg-red-400 font-bold
                            transition-all flex items-center justify-center  cursor-pointer duration-150 active:scale-90 hover:scale-105
                            "
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

                    <table className="mt-8 w-full">
                        <thead>
                            <tr className="text-left">
                                <th>Title</th>
                                <th>Year Released</th>
                                <th>Rating</th>
                                <th>Created By</th>
                                <th>Created At</th>
                                <th>{authStore.user?.role === Role.manager ? "Actions" : ''}</th>
                            </tr>
                        </thead>

                        <tbody>
                            {movieStore.movies.map(movie => (
                                <tr key={movie.id}>
                                    <td className="py-3">{movie.title}</td>
                                    <td className="py-3">{movie.year_released}</td>
                                    <td className="py-3">{movie.rating}</td>
                                    <td className="py-3">{movie.created_by.role}</td>
                                    <td className="py-3">{formatDate(movie.created_at)}</td>
                                    <td className="py-3">
                                        {authStore.user?.role === Role.manager && (
                                            <button
                                                onClick={() => movieStore.deleteMovie(movie.id)}
                                                className="border p-2 rounded-2xl "
                                            >
                                                Delete
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>




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