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

    console.log('render, movies:', movieStore.movies.length)
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        movieStore.fetchMovies()
    }, [])

    const headers = ['Title', 'Year Released', 'Rating', 'Created By', 'Created At',
        ...(authStore.user?.role === "manager" ? ['Actions'] : [])]

    const handleLogout = async () => {
        await authStore.logout()
        navigate("/")
    }


    if (movieStore.isLoading) return <Loading />


    return (
        <div className="min-h-screen flex justify-center items-center text-xl">
            <div className="min-h-[60vh] flex w-[70%] my-[15%] border border-white rounded-xl shadow-lg pt-8 pb-16">
                <div className="w-1/4 border-r border-white mb-4">
                    <div className="flex justify-center">
                        <p className="font-bold">Dashboard</p>
                    </div>
                </div>

                <div className="w-3/4 pl-10 pb-4 pr-8">
                    <div className="flex justify-between items-center">
                        <div className="font-bold">
                            <p className="pb-3">Username: <span className="capitalize">{authStore.user?.username}</span> </p>
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
                            className="border p-4 rounded-2xl bg-green-700 font-bold
                            transition-all flex items-center justify-center  cursor-pointer duration-150 active:scale-90 hover:scale-105
                            "
                            onClick={() => setIsModalOpen(true)}
                        >
                            Create Movie +
                        </button>
                    </div>

                    <table className="mt-8 w-full">
                        <thead>
                            <tr className="text-left">
                                {headers.map(header => (
                                    <th key={header} className="pb-3">{header}</th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {
                                movieStore.movies.map(movie => {
                                    console.log('mapping movie:', movie.title)
                                    const cells = [
                                        movie.title,
                                        movie.year_released,
                                        movie.rating,
                                        movie.created_by.role,
                                        formatDate(movie.created_at)
                                    ]
                                    return (
                                        <tr key={movie.id} className="border-t text-white">
                                            {cells.map((cell, index) => (
                                                <td key={index} className="py-6 font-bold">{cell}</td>
                                            ))}
                                            {authStore.user?.role === Role.manager && (
                                                <td>
                                                    <button
                                                        onClick={() => movieStore.deleteMovie(movie.id)}
                                                        className="border rounded-2xl p-3 bg-red-500
                                                        transition-all flex items-center justify-center  cursor-pointer duration-150 active:scale-90 hover:scale-105
                                                        "
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            )}
                                        </tr>
                                    )
                                })}
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