import { useState } from "react";
import { Movie, MovieListProps } from "../../resources/types.tsx";
import DeleteMovie from "../DeleteMovie";
import UpdateMovie from "../UpdateMovie";
import "../../resources/global.css";
import "./index.css";
import { Link, Route, Routes } from "react-router-dom";
import UpdateMoviePage from "../../pages/UpdateMoviePage.tsx";

export default function MovieList({
                                      movies,
                                      onDeleteMovie,
                                      onUpdateMovie
                                  }: Readonly<MovieListProps>) {
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

    const handleUpdateClick = (movie: Movie) => {
        setSelectedMovie(movie);
    };

    const handleCancelUpdate = () => {
        setSelectedMovie(null);
    };

    return (
        <>
            <Routes>
                <Route path="/" element={<MovieList movies={movies} onDeleteMovie={onDeleteMovie} onUpdateMovie={onUpdateMovie} />} />
                <Route path="/update/:id" element={<UpdateMoviePage />} />
            </Routes>

            <div>
                {!movies ? (
                    <strong>movies are loading</strong>
                ) : (
                    <ul>
                        <h2>Movie List</h2>
                        {movies.map((movie) => (
                            <li key={movie.id}>
                                <span>🎬</span>
                                <h3>Title: {movie.title}</h3>
                                <span>📝</span>
                                <p>Author: {movie.author}</p>
                                <DeleteMovie movieId={movie.id} onDeleteMovie={onDeleteMovie} />
                                {!selectedMovie && (
                                    <Link to={`/update/${movie.id}`}>
                                        <button className="update-button" onClick={() => handleUpdateClick(movie)}>
                                            Update
                                        </button>
                                    </Link>
                                )}
                                {selectedMovie && selectedMovie.id === movie.id && (
                                    <UpdateMovie
                                        movie={selectedMovie}
                                        onUpdateMovie={(updatedMovie) => {
                                            onUpdateMovie(updatedMovie);
                                            handleCancelUpdate();
                                        }}
                                    />
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
}
