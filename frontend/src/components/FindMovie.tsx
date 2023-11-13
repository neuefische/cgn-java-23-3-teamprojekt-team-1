import axios from "axios";
import { FindMovieByIdProps } from "../lib/types.tsx";
import { ChangeEvent, FormEvent, useState } from "react";
import styled from "styled-components";

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

    return (
        <CenteredContainer>
            <Form onSubmit={handleFormSubmit}>
                <div>
                    <Label htmlFor="movieIdInput">Find Movie</Label>
                    <Input
                        type="text"
                        id="movieIdInput"
                        placeholder="Enter the movie ID"
                        value={movieId}
                        onChange={changeInputMovieId}
                    />
                </div>
                <Button type="submit">Find</Button>
            </Form>
        </CenteredContainer>
    );
}

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  width: 20em;
  height: 4em;
  margin-top: 10px;
  padding: 1em;
  background-color: #D73832;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  transition: background-color 0.3s ease-in-out;
  
  &:hover {
    background-color: #9F2A24;
  }
`;

const Label = styled.label`
  display: block;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 30px;
  font-weight: 500;
  color: #D73832;
`;

const Input = styled.input`
  width: 20em;
  height: 1em;
  padding: 1em;
  font-size: 16px;
  font-weight: 500;
  border: 1px solid #D73832;
  border-radius: 8px;
  margin-top: 4px;
  box-sizing: border-box;
  outline: none;

  &:focus {
    border-color: #D73832;
  }
`;
