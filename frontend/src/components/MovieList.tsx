import { MovieListProps } from "../lib/types.tsx";
import DeleteMovie from './DeleteMovie.tsx';
import styled from "styled-components";

export default function MovieList({movies, onDeleteMovie}: Readonly<MovieListProps>) {
    return (
        <MovieListContainer>
            <>
                {!movies ? <strong>movies are loading</strong> : (
                    <MovieListSection>
                        {movies.map(movie => (
                            <MovieListItem key={movie.id}>
                                <Emoji>🎬</Emoji>
                                <H3> Title: {movie.title}</H3>
                                <Emoji>📝</Emoji>
                                <P>Author: {movie.author}</P>
                                <DeleteMovie movieId={movie.id} onDeleteMovie={onDeleteMovie}/>
                            </MovieListItem>
                        ))}
                    </MovieListSection>
                )}
            </>
        </MovieListContainer>
    );
}

const MovieListContainer = styled.div`
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

const MovieListSection = styled.ul`
    list-style-type: none;
    padding: 0;
`

const MovieListItem = styled.li`
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

const H3 = styled.h3`
  color: white;
  font-family: "Arial", "Helvetica", sans-serif;
  font-weight: bold;
`;

const P = styled.p`
  color: white;
  font-family: "Arial", "Helvetica", sans-serif;
`;