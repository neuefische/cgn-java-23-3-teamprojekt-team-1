import {useState} from "react";
import {Movie} from "./lib/types.tsx";
import MovieList from "./components/MovieList.tsx";
import AddMovie from "./components/AddMovie.tsx";

export default function App(): JSX.Element {
    const [movies, setMovies] = useState<Movie[]>([]);

    return (
        <>
            <AddMovie movies={movies} setMovies={setMovies}/>
            <MovieList movies={movies} setMovies={setMovies}/>
        </>
    );
}