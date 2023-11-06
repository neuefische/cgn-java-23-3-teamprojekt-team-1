export type Movie = {
    id: string,
    title: string,
    author: string
}

export type AddMovieProps = {
    onAddNewMovie: (newMovie: Movie) => void;
};

export type MovieListProps = {
    movies: Movie[];
};