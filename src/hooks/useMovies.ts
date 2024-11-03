import { useCallback, useMemo, useRef, useState } from "react"
import { IMovies, searchMovies } from "../services/searchMovies"

interface UseMoviesProps {
    sort: boolean
}

export function useMovies({sort}: UseMoviesProps) {
    const [movies, setMovies] = useState<IMovies[]>([])
    const lastSearch = useRef('')

    const getMovies = useCallback(async ({search}: {search: string}) => {
        if (!search) return
        if (lastSearch.current === search) return
        const newMovies = await searchMovies({search})
        setMovies(newMovies)
        lastSearch.current = search
    }, [])

    const sortedMovies = useMemo(() => {
        return sort
        ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
        : movies 
    }, [sort, movies])


    return { movies: sortedMovies, getMovies, lastSearch }
}

