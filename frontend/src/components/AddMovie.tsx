import axios from "axios";
import { MovieListProps } from "../lib/types.tsx";
import {ChangeEvent, FormEvent, useState} from "react";

export default function AddMovie({ movies, setMovies }: MovieListProps) {
    const [userInputTitle, setUserInputTitle] = useState<string>('');
    const [userInputAuthor, setUserInputAuthor] = useState<string>('');

    const changeInputTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setUserInputTitle(event.target.value);
    };

    const changeInputAuthor = (event: ChangeEvent<HTMLInputElement>):void => {
        setUserInputAuthor(event.target.value);
    };

    const handleFormSubmit = (event: FormEvent<HTMLFormElement>):void => {
        event.preventDefault();
        axios.post('/api/movies', {
            title: userInputTitle,
            author: userInputAuthor
        })
            .then(response => {
                setMovies([...movies, response.data]);
                setUserInputTitle('');
                setUserInputAuthor('');
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label htmlFor="titleInput">Title:</label>
                    <input
                        type="text"
                        id="titleInput"
                        placeholder="Enter the title"
                        value={userInputTitle}
                        onChange={changeInputTitle}
                    />
                </div>
                <div>
                    <label htmlFor="authorInput">Author:</label>
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
        </>
    );
}