import { useEffect, useState } from "react";
import { Movie } from "./lib/types.tsx";
import MovieList from "./components/MovieList.tsx";
import AddMovie from "./components/AddMovie.tsx";
import FindMovie from "./components/FindMovie.tsx";
import axios from "axios";
import styled from "styled-components";

export default function App(): JSX.Element {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [foundMovie, setFoundMovie] = useState<Movie | null>(null);

    useEffect(() => {
        axios.get('/api/movies')
            .then(response => {
                setMovies(response.data as Movie[]);
            })
            .catch(error => {
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

    const handleFindMovie = (foundMovie: Movie) => {
        setFoundMovie(foundMovie);
    };

    return (
        <>
            <Section>
                <AddMovie onAddNewMovie={handleAddNewMovie} />
                <FindMovie onFindMovie={handleFindMovie} />
                {foundMovie && (
                    <div>
                        <h2>Found Movie:</h2>
                        <p>Title: {foundMovie.title}</p>
                        <p>Author: {foundMovie.author}</p>
                    </div>
                )}
                <MovieList movies={movies} onDeleteMovie={handleDeleteMovie} />

            </Section>
        </>
    );
}

const Section = styled.section`
  display: flex;
  flex-direction: column;
  margin: 1em;
`;
