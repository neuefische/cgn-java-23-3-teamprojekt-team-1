import React from 'react';
import { useParams } from 'react-router-dom';
import UpdateMovie from '../components/UpdateMovie';
import { Movie } from '../resources/types';
import axios from 'axios';

export default function UpdateMoviePage
    (): JSX.Element {
    




    const { id } = useParams<{ id: string }>();

    const [movie, setMovie] = React.useState<Movie | null>(null);

    React.useEffect(() => {
        axios
            .get(`/api/movies/${id}`)
            .then((response) => {
                setMovie(response.data as Movie);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [id]);

    const handleUpdateMovie = (updatedMovie: Movie) => {
        axios
            .put(`/api/movies/${updatedMovie.id}`, updatedMovie)
            .then(() => {
                // Handle successful update if needed
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div>
            {movie ? (
                <UpdateMovie movie={movie} onUpdateMovie={handleUpdateMovie} />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};


