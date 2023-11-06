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
                    setMovies(response.data);
                })
                .catch(error => {
                    console.log(error);
                });

    }, []);

    function addNewMovie(newMovie: Movie) {
        setMovies([...movies, newMovie])
    }

    return (
        <>
            <AddMovie onAddNewMovie={addNewMovie}/>
            <MovieList movies={movies} />
        </>
    );
}