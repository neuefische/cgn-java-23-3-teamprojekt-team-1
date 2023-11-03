import axios from "axios";
import React, { useEffect } from "react";
import { Movie } from "../lib/types.tsx";

interface MovieListProps {
    movies: Movie[] | null;
    setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
}

export default function MovieList({ movies, setMovies }: MovieListProps) {
    useEffect(() => {
        if (movies === null) {
            axios.get('/api/movies')
                .then(response => {
                    setMovies(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [movies, setMovies]); // Include movies and setMovies as dependencies

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


