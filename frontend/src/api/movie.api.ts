import api from "./axios";
import type { Movie, MovieInput, MovieUpdateInput } from "../types/movie.type";

export const getAllMovies = async (): Promise<Movie[]> => {
    const response = await api.get('/movies')
    return response.data
}

export const createMovie = async (data: MovieInput): Promise<Movie> => {
    const response = await api.post('/movies', data)
    return response.data
}

export const updateMovie = async (id: number, data: MovieUpdateInput): Promise<Movie> => {
    const response = await api.patch(`/movies/${id}`, data)
    return response.data
}

export const deleteMovie = async (id: number): Promise<void> => {
    const response = await api.delete(`/movies/${id}`)
    return response.data
}