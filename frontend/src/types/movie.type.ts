interface CreatedBy {
    username: string
    role: string
}

export interface Movie {
    id: number
    title: string
    year_released: number
    rating: string
    created_by: CreatedBy | null
    created_at: string
    updated_at: string
}

export interface MovieInput {
    title: string
    year_released: number
    rating: string
}

export type MovieUpdateInput = Partial<MovieInput>


