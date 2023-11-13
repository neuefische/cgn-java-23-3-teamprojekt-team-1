import axios from 'axios';
import { DeleteMovieProps } from "../../resources/types.tsx";
import "../../resources/global.css";
import "./index.css";

export default function DeleteMovie({ movieId, onDeleteMovie }: DeleteMovieProps) {
    function deleteThisMovie() {
        axios.delete(`/api/movies/${movieId}`)
            .then(() => {
                onDeleteMovie(movieId);
            })
            .catch(error => {
                console.error('Error when deleting the film:', error);
            });
    }

    return (
        <button className="delete-button" onClick={deleteThisMovie}>Delete</button>
    );
}