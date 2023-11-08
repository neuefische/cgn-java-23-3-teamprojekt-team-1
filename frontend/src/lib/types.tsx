export type Movie = {
    id: string;
    title: string;
    author: string;
};

export type AddMovieProps = {
    onAddNewMovie: (newMovie: Movie) => void;
};

export type MovieListProps = {
    movies: Movie[];
    onDeleteMovie: (movieId: string) => void;
};

export type DeleteMovieProps = {
    movieId: string;
    onDeleteMovie: (movieId: string) => void;
};
