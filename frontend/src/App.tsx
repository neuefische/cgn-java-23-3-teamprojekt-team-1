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

    function handleFindMovie(foundMovie: Movie)  {
        setFoundMovie(foundMovie);
    }

    return (
        <>
            <Section>
                <AddMovie onAddNewMovie={handleAddNewMovie} />
                <FindMovie onFindMovie={handleFindMovie} />
                {foundMovie && (
                    <MovieSearchContainer>
                        <H2>Found Movie</H2>
                    <MovieSearchItem>
                        <Emoji>🎬</Emoji>
                        <P>Title: {foundMovie.title}</P>
                        <Emoji>📝</Emoji>
                        <P>Author: {foundMovie.author}</P>
                    </MovieSearchItem>
                    </MovieSearchContainer>
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

const MovieSearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: auto;
`;

const Emoji = styled.span`
  align-self: center;
  font-size: 24px;
`;

const MovieSearchItem = styled.li`
  background-color: #222;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 10px;
  list-style: none;
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: auto 1fr;
  grid-row-gap: 2px;
  grid-column-gap: 10px;
  
`;

const H2 = styled.h2`
  font-family: "Arial", "Helvetica", sans-serif;
  font-size: 30px;
  font-weight: 500;
  color: #D73832;
`;

const P = styled.p`
  color: white;
  font-family: "Arial", "Helvetica", sans-serif;
`;