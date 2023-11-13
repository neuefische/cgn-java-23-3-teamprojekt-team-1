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
    onUpdateMovie: (updatedMovie: Movie) => void;

};

export type DeleteMovieProps = {
    movieId: string;
    onDeleteMovie: (movieId: string) => void;
};

export type FindMovieByIdProps = {
    onFindMovie: (foundMovie: Movie) => void;
};

export type UpdateMovieProps = {
    movie: Movie;
    onUpdateMovie: (updatedMovie: Movie) => void;
}