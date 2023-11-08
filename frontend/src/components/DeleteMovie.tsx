import axios from 'axios';
import { DeleteMovieProps } from "../lib/types.tsx";
import styled from "styled-components";

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
        <Button onClick={deleteThisMovie}>Delete</Button>
    );
}

const Button = styled.button`
  width: 6em;
  height: 2em;
  margin-top: 10px;
  padding: 0;
  background-color: #D73832;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 15px;
  font-weight: 100;
  text-align: center;
  line-height: 2em;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #9F2A24;
  }
`;