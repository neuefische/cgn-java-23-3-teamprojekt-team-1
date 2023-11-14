import axios from "axios";
import { AddMovieProps } from "../../resources/types.tsx";
import { ChangeEvent, FormEvent, useState } from "react";
import "../../resources/global.css";
import "./index.css";

export default function AddMovie({ onAddNewMovie }: AddMovieProps) {
    const [userInputTitle, setUserInputTitle] = useState<string>('');
    const [userInputAuthor, setUserInputAuthor] = useState<string>('');

    const changeInputTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setUserInputTitle(event.target.value);
    };

    const changeInputAuthor = (event: ChangeEvent<HTMLInputElement>) => {
        setUserInputAuthor(event.target.value);
    };

    const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        axios.post('/api/movies', {
            title: userInputTitle,
            author: userInputAuthor
        })
            .then(response => {
                onAddNewMovie(response.data);
                setUserInputTitle('');
                setUserInputAuthor('');
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label htmlFor="titleInput">Title</label>
                    <input
                        type="text"
                        id="titleInput"
                        placeholder="Enter the title"
                        value={userInputTitle}
                        onChange={changeInputTitle}
                    />
                </div>
                <div>
                    <label htmlFor="authorInput">Author</label>
                    <input
                        type="text"
                        id="authorInput"
                        placeholder="Enter the author"
                        value={userInputAuthor}
                        onChange={changeInputAuthor}
                    />
                </div>
                <button type="submit">Add</button>
            </form>
        </div>
    );
}