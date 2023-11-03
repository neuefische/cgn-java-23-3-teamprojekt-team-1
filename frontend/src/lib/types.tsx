import React from "react";

export type Movie = {
    id: string,
    title:string,
    author:string
}

export interface MovieListProps {
    movies: Movie[];
    setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
}