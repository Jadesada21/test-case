import { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useStore } from '../store'
import type { MovieInput } from '../types/movie.type'
import type { Props } from '../types/movie.modal.type'
import Loading from './Loading'



export const MovieModal = observer(({ isOpen, onClose }: Props) => {
    const { movieStore } = useStore()
    const [form, setForm] = useState<MovieInput>({
        title: "",
        year_released: 0,
        rating: ""
    })

    if (!isOpen) return null

    const ratings = ['G', 'PG', 'M', 'MA', 'R']

    const handleSubmit = async () => {
        await movieStore.createMovies(form)
        onClose()
    }

    return (

        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
            <div className="fixed inset-0 bg-black/50 flex justify-center items-center">

                <div className="w-100 p-10 border rounded-2xl bg-[#373537] ">
                    <h2 className="text-xl font-bold mb-4">Create Movie</h2>

                    <p className="pb-2 font-bold">Title</p>
                    <input
                        type="text"
                        placeholder='Title'
                        value={form.title}
                        onChange={e => setForm({ ...form, title: e.target.value })}
                        maxLength={200}
                        className="w-full border p-2 rounded mb-4"
                    />

                    <p className="pb-2 font-bold">Year Released</p>
                    <input
                        type="text"
                        placeholder='Year Released'
                        value={form.year_released || ''}
                        onChange={e => {
                            const value = e.target.value
                            if (/^\d*$/.test(value)) {
                                setForm({ ...form, year_released: Number(e.target.value) })
                            }
                        }}
                        maxLength={4}
                        className="w-full border p-2 rounded mb-4"
                    />

                    <p className="pb-2 font-bold">Rating</p>
                    <select
                        value={form.rating}
                        onChange={e => setForm({ ...form, rating: e.target.value })}
                        className="w-full border p-2 rounded mb-4"
                    >
                        <option className="bg-[#373537]" value="">Selected Rating</option>
                        {ratings.map(rating => (
                            <option key={rating} value={rating} className="bg-[#373537] ">
                                {rating}
                            </option>
                        ))}
                    </select >

                    <div className="flex justify-end gap-4 pt-3">
                        <button
                            onClick={handleSubmit}
                            disabled={movieStore.isLoading}
                            className="bg-blue-500 text-white p-2 rounded-xl px-4 
                            disabled:opacity-50 transition-all flex items-center justify-center  cursor-pointer duration-150 active:scale-90 hover:scale-105"
                        >
                            {movieStore.isLoading ? <Loading /> : 'created'}
                        </button>

                        <button
                            onClick={onClose}
                            className="border p-2 rounded-xl px-4  transition-all flex items-center justify-center  cursor-pointer duration-150 active:scale-90 hover:scale-105">
                            Cancel
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
})