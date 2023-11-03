import axios from "axios";
import {ChangeEvent, useEffect, useState} from "react";
import {Movie} from "./lib/types.tsx";
import MovieList from "./components/MovieList.tsx";



export default  function App ():JSX.Element {
  const [movies, setMovies] = useState<Movie[]>([]);
    const [userInputTitle, setUserInputTitle] = useState<string>('');
    const [userInputAuthor, setUserInputAuthor] = useState<string>('');

    const changeInputTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setUserInputTitle(event.target.value);
    };

    const changeInputAuthor = (event: ChangeEvent<HTMLInputElement>) => {
        setUserInputAuthor(event.target.value);
    };

    function getMovies(){
    axios.get('/api/movies')
        .then(response => {
          setMovies(response.data);
        })
        .catch(error => {
          console.log(error);
        });
  };

  useEffect(() => {
    getMovies();
  }, []);


    const addMovie = (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        axios.post('/api/movies', {
            title: userInputTitle,
            author: userInputAuthor
        })
            .then(response => {
                setMovies([...movies, response.data]);
                setUserInputTitle('');
                setUserInputAuthor('')
            })
            .catch(error => {
                console.log(error);
            });
    };



    return (
        <>

            <form onSubmit={addMovie}>
                <input type="text" placeholder="Title" value={userInputTitle} onChange={changeInputTitle} />
                <input type="text" placeholder="Author" value={userInputAuthor} onChange={changeInputAuthor} />
                <button type="submit">Add</button>
            </form>
            <MovieList movies={movies} setMovies={setMovies}/>
        </>
    );
}