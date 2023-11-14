import axios from "axios";
import { FindMovieByIdProps } from "../../resources/types.tsx";
import "../../resources/global.css";
import "./index.css";


import { ChangeEvent, FormEvent, useState } from "react";

export default function FindMovie({ onFindMovie }: FindMovieByIdProps) {
    const [movieId, setMovieId] = useState<string>('');

    const changeInputMovieId = (event: ChangeEvent<HTMLInputElement>) => {
        setMovieId(event.target.value);
    };

    const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        axios.get(`/api/movies/${movieId}`)
            .then(response => {
                onFindMovie(response.data);
                setMovieId('');
            })
            .catch(error => {
                console.log(error);
            });
    };

    return ( <>
        <section>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label htmlFor="movieIdInput">Find Movie</label>
                    <input
                        type="text"
                        id="movieIdInput"
                        placeholder="Enter the movie ID"
                        value={movieId}
                        onChange={changeInputMovieId}
                    />
                    <button type="submit">Find</button>
                </div>

            </form>
        </section></>
    );
}