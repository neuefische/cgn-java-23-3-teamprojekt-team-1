import {useEffect, useState} from "react";
import {Movie} from "./lib/types.tsx";
import MovieList from "./components/MovieList.tsx";
import AddMovie from "./components/AddMovie.tsx";
import axios from "axios";

export default function App(): JSX.Element {
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(():void => {
            axios.get('/api/movies')
                .then(response => {
                    setMovies(response.data as Movie[]);
                })
                .catch(error => {
                    console.error(error);
                });

    }, []);

    function addNewMovie(newMovie: Movie) {
        setMovies([...movies, newMovie])
    }

    function deleteMovie(movieId: string) {
        setMovies((currentMovies) =>
            currentMovies.filter((movie) => movie.id !== movieId)
        );
    }

    return (
        <>
            <AddMovie onAddNewMovie={addNewMovie}/>
            <MovieList movies={movies} onDeleteMovie={deleteMovie}/>
        </>
    );
}