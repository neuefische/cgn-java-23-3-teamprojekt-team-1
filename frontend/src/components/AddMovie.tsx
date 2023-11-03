import React, { ChangeEvent, useState } from "react";
import axios from "axios";
import { MovieListProps } from "../lib/types.tsx";

export default function AddMovie({ movies, setMovies }: MovieListProps) {
    const [userInputTitle, setUserInputTitle] = useState<string>('');
    const [userInputAuthor, setUserInputAuthor] = useState<string>('');

    const changeInputTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setUserInputTitle(event.target.value);
    };

    const changeInputAuthor = (event: ChangeEvent<HTMLInputElement>):void => {
        setUserInputAuthor(event.target.value);
    };

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>):void => {
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
                <input type="text" placeholder="Title" value={userInputTitle} onChange={changeInputTitle} />
                <input type="text" placeholder="Author" value={userInputAuthor} onChange={changeInputAuthor} />
                <button type="submit">Add</button>
            </form>
        </>
    );
}