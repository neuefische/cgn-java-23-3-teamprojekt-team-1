import {useEffect, useState} from "react";
import {Movie} from "./resources/types.tsx";
import MovieList from "./components/MovieList";
import AddMovie from "./components/AddMovie";
import FindMovie from "./components/FindMovie";
import axios from "axios";
import "./resources/global.css";
import "./App.css";

export default function App(): JSX.Element {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [foundMovie, setFoundMovie] = useState<Movie | null>(null);

    useEffect(() => {
        axios
            .get("/api/movies")
            .then((response) => {
                setMovies(response.data as Movie[]);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    function handleAddNewMovie(newMovie: Movie) {
        setMovies([...movies, newMovie]);
    }

    function handleDeleteMovie(movieId: string) {
        setMovies((currentMovies) =>
            currentMovies.filter((movie) => movie.id !== movieId)
        );
    }

    function handleFindMovie(foundMovie: Movie) {
        setFoundMovie(foundMovie);
    }

    function handleUpdateMovie(updatedMovie: Movie) {
        axios
            .put(`/api/movies/${updatedMovie.id}`, updatedMovie)
            .then(() => {
                setMovies((currentMovies) =>
                    currentMovies.map((movie) =>
                        movie.id === updatedMovie.id ? updatedMovie : movie
                    )
                );
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <>
            <section>
                <AddMovie onAddNewMovie={handleAddNewMovie}/>
                <FindMovie onFindMovie={handleFindMovie}/>
                {foundMovie && (
                    <div>
                        <h2>Found Movie</h2>
                        <li>
                            <span role="img" aria-label="Movie Clapper">🎬</span>
                            <p>Title: {foundMovie.title}</p>
                            <span role="img" aria-label="Note">📝</span>
                            <p>Author: {foundMovie.author}</p>
                        </li>
                    </div>
                )}

                <MovieList movies={movies} onDeleteMovie={handleDeleteMovie} onUpdateMovie={handleUpdateMovie}/>
            </section>
        </>
    );
}