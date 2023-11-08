import { MovieListProps } from "../lib/types.tsx";
import DeleteMovie from './DeleteMovie.tsx';

export default function MovieList({ movies, onDeleteMovie }: MovieListProps) {
    return (
        <>
            {!movies.length ? <strong>Filme werden geladen...</strong> : (
                <ul>
                    {movies.map(movie => (
                        <li key={movie.id}>
                            <h3>Titel: {movie.title}</h3>
                            <p>Autor: {movie.author}</p>
                            <DeleteMovie movieId={movie.id} onDeleteMovie={onDeleteMovie}/>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}
