import axios from "axios";
import { AddMovieProps } from "../lib/types.tsx";
import { ChangeEvent, FormEvent, useState } from "react";
import styled from "styled-components";

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
        <CenteredContainer>
            <Form onSubmit={handleFormSubmit}>
                <div>
                    <Label htmlFor="titleInput">Title</Label>
                    <Input
                        type="text"
                        id="titleInput"
                        placeholder="Enter the title"
                        value={userInputTitle}
                        onChange={changeInputTitle}
                    />
                </div>
                <div>
                    <Label htmlFor="authorInput">Author</Label>
                    <Input
                        type="text"
                        id="authorInput"
                        placeholder="Enter the author"
                        value={userInputAuthor}
                        onChange={changeInputAuthor}
                    />
                </div>
                <Button type="submit">Add</Button>
            </Form>
        </CenteredContainer>
    );
}

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
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