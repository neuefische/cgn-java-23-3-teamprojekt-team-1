import axios from "axios";
import {MovieListProps} from "../lib/types.tsx";
import {useEffect} from "react";

export default function MovieList({ movies, setMovies }: MovieListProps) {
    useEffect(():void => {
        if (movies === null) {
            axios.get('/api/movies')
                .then(response => {
                    setMovies(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [movies, setMovies]);

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