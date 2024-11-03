const API_MOVIES = `https://www.omdbapi.com?apikey=4287ad07&type=movie&s=`

interface IApiMovieResult {
    imdbID: string
    Title: string
    Year: string
    Type: string
    Poster: string
}

interface IApiResult {
    Search: IApiMovieResult[]
    totalResults: number
    Response: boolean
    Error: string
}

export interface IMovies {
    id: string
    title: string
    year: string
    posterUrl: string
}

export async function searchMovies({search}: {search: string}): Promise<IMovies[]>{
    console.log(`Buscando por ${search}`)
    try {
        const response = await fetch(`${API_MOVIES}${search}`)
        const json = await response.json() as IApiResult
        
        if (!json.Response) return []

        return (json.Search.map(movie => {
            return {
                id: movie.imdbID,
                title: movie.Title,
                year: movie.Year,
                posterUrl: movie.Poster
            }
        }))   
    } catch (error: any) {
        throw new Error(`Error looking movies by ${search}: ${error.message}`)
    }
}