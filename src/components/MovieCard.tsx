import { IMovies } from "../services/searchMovies";

export function MovieCard({ id, title, year, posterUrl }: IMovies) {
    return <li key={id} className='movie'>
        <h5>{title}</h5>
        <span>{year}</span>
        <img src={posterUrl} alt={`${title}'s poster`} width={250} height="auto" />
    </li>
}