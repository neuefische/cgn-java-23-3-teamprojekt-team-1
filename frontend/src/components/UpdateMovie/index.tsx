import { useState } from "react";
import {Movie, UpdateMovieProps} from "../../resources/types.tsx";
import "../../resources/global.css";
import "./index.css";


export default function UpdateMovie({ movie, onUpdateMovie }: UpdateMovieProps): JSX.Element {
    const [updatedTitle, setUpdatedTitle] = useState<string>(movie.title);
    const [updatedAuthor, setUpdatedAuthor] = useState<string>(movie.author);

    const handleUpdateClick = () => {
        const updatedMovie: Movie = {
            id: movie.id,
            title: updatedTitle,
            author: updatedAuthor,
        };
        onUpdateMovie(updatedMovie);
    };

    return (
        <div className="update-form">
            <h3>Update Movie</h3>
            <label className="update-label">
                Title:
                <input className="update-input"
                    type="text"
                    value={updatedTitle}
                    onChange={(e) => setUpdatedTitle(e.target.value)}
                />
            </label>
            <label className="update-label">
                Author:
                <input className="update-input"
                    type="text"
                    value={updatedAuthor}
                    onChange={(e) => setUpdatedAuthor(e.target.value)}
                />
            </label>
            <button className="update-button"onClick={handleUpdateClick}>Update</button>
        </div>
    );
}