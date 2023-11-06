import {MovieListProps} from "../lib/types.tsx";

export default function MovieList({ movies }: MovieListProps) {
    return (
        <>
            {!movies ? <strong>movies are loading</strong> : (
                <ul>
                    {movies.map(movie => (
                        <li key={movie.id}>
                            <h3>Title: {movie.title}</h3>
                            <p>Author: {movie.author}</p>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}