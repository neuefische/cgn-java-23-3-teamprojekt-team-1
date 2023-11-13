import { MovieListProps } from "../../resources/types.tsx";
import DeleteMovie from '../DeleteMovie';
import "../../resources/global.css";
import "./index.css";

export default function MovieList({ movies, onDeleteMovie }: Readonly<MovieListProps>) {
    return (
        <div>
            <>
                {!movies ? <strong>movies are loading</strong> : (
                    <ul>
                        <h2>Movie List</h2>
                        {movies.map(movie => (
                            <li key={movie.id}>
                                <span>🎬</span>
                                <h3> Title: {movie.title}</h3>
                                <span>📝</span>
                                <p>Author: {movie.author}</p>
                                <DeleteMovie movieId={movie.id} onDeleteMovie={onDeleteMovie} />
                            </li>
                        ))}
                    </ul>
                )}
            </>
        </div>
    );
}