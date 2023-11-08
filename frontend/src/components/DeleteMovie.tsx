import axios from 'axios';
import { DeleteMovieProps } from "../lib/types.tsx";

export default function DeleteMovie({ movieId, onDeleteMovie }: DeleteMovieProps) {
    function deleteThisMovie() {
        axios.delete(`/api/movies/${movieId}`)
            .then(() => {
                onDeleteMovie(movieId);
            })
            .catch(error => {
                console.error('Fehler beim Löschen des Films:', error);
            });
    }

    return (
        <button onClick={deleteThisMovie}>Löschen</button>
    );
}
