import { types, flow } from 'mobx-state-tree'
import { getAllMovies, createMovie, updateMovie, deleteMovie } from '../api/movie.api'
import type { Movie, MovieInput, MovieUpdateInput } from '../types/movie.type'

export const MovieStore = types
    .model('MovieStore', {
        movies: types.array(types.model({
            id: types.number,
            title: types.string,
            year_released: types.string,
            rating: types.string,
            created_by: types.model({
                username: types.string,
                role: types.string
            }),
            created_at: types.string,
            updated_at: types.string
        })),
        isLoading: types.optional(types.boolean, false),
        error: types.maybeNull(types.string)
    })
    .actions(self => ({
        fetchMovies: flow(function* () {
            self.isLoading = true
            self.error = null
            try {
                const data: Movie[] = yield getAllMovies()
                self.movies = data as any
            } catch (err: unknown) {
                if (err instanceof Error) self.error = err.message
            } finally {
                self.isLoading = false
            }
        }),

        createMovies: flow(function* (movie: MovieInput) {
            self.isLoading = true
            self.error = null
            try {
                const data: Movie = yield createMovie(movie)
                self.movies.unshift(data as any)
            } catch (err: unknown) {
                if (err instanceof Error) self.error = err.message
            } finally {
                self.isLoading = false
            }
        }),

        updateMovies: flow(function* (id: number, movie: MovieUpdateInput) {
            self.isLoading = true
            self.error = null
            try {
                const data: Movie = yield updateMovie(id, movie)
                const index = self.movies.findIndex(m => m.id === id)
                if (index !== -1) self.movies[index] = data as any
            } catch (err: unknown) {
                if (err instanceof Error) self.error = err.message
            } finally {
                self.isLoading = false
            }
        }),

        deleteMovie: flow(function* (id: number) {
            self.isLoading = true
            self.error = null
            try {
                yield deleteMovie(id)
                self.movies.replace(self.movies.filter(m => m.id !== id))
            } catch (err: unknown) {
                if (err instanceof Error) self.error = err.message
            } finally {
                self.isLoading = false
            }
        }),

        clearError() {
            self.error = null
        }
    }))