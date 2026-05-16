export enum Rating {
    g = "G",
    pg = "PG",
    m = "M",
    ma = "MA",
    r = "R"
}

export interface MovieInput {
    title: string
    year_released: number
    rating: Rating
}