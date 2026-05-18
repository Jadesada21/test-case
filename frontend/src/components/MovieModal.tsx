import { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useStore } from '../store'
import type { MovieInput } from '../types/movie.type'
import type { Props } from '../types/movie.modal.type'
import Loading from './loading'



export const MovieModal = observer(({ isOpen, onClose }: Props) => {
    const { movieStore } = useStore()
    const [form, setForm] = useState<MovieInput>({
        title: "",
        year_released: 0,
        rating: ""
    })

    if (!isOpen) return null

    const handleSubmit = async () => {
        await movieStore.createMovies(form)
        onClose()
    }

    return (

        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
            <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
                <h2 className="text-xl font-bold mb-4">Create Movie</h2>

                <input
                    type="text"
                    placeholder='Title'
                    value={form.title}
                    onChange={e => setForm({ ...form, title: e.target.value })}
                    maxLength={200}
                    className="w-full border p-2 rounded mb-4"
                />

                <input
                    type="text"
                    placeholder='Year Released'
                    value={form.year_released}
                    onChange={e => setForm({ ...form, year_released: Number(e.target.value) })}
                    maxLength={10}
                    className="w-full border p-2 rounded mb-4"
                />

                <select
                    value={form.rating}
                    onChange={e => setForm({ ...form, rating: e.target.value })}
                    className="w-full border p-2 rounded mb-4"
                >
                    <option value="">Selected Rating</option>
                    <option value="G">G</option>
                    <option value="PG">PG</option>
                    <option value="M">M</option>
                    <option value="MA">MA</option>
                    <option value="R">R</option>
                </select >

                <div className="flex justify-end gap-4">
                    <button
                        onClick={handleSubmit}
                        disabled={movieStore.isLoading}
                        className="bg-blue-500 text-white p-2 rounded-xl px-4 disabled:opacity-50"
                    >
                        {movieStore.isLoading ? <Loading /> : 'created'}
                    </button>

                    <button
                        onClick={onClose}
                        className="border p-2 rounded-xl px-4">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
})