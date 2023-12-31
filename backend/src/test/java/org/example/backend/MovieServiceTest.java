package org.example.backend;
import org.junit.jupiter.api.Test;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

class MovieServiceTest {

    private MovieRepository movieRepository = mock(MovieRepository.class);
    private MovieService movieService = new MovieService(movieRepository);

    @Test
    void getAllMoviesShouldReturnListOfMoviesWhenRequested() {
        // GIVEN
        List<Movie> expected = List.of(
                new Movie("15432-3215", "Waschen Film", "Someone"),
                new Movie("3215-15432", "Putzen Film", "Someone else")
        );

        // WHEN
        when(movieRepository.findAll()).thenReturn(expected);
        List<Movie> actual = movieService.getAllMovies();

        // THEN
        verify(movieRepository).findAll();
        assertEquals(expected, actual);
    }

    @Test
    void addMovieShouldSaveAndReturnSameMovie() {
        // GIVEN
        Movie movie = new Movie("15432-3215", "Waschen Film", "Someone");
        Movie expected = new Movie("15432-3215", "Waschen Film", "Someone");
        // WHEN
        when(movieRepository.save(any(Movie.class))).thenReturn(expected);
        Movie actual = movieService.addMovie(movie);
        // THEN
        verify(movieRepository).save(any(Movie.class));
        assertEquals(expected, actual);
    }

    @Test
    void getMovieById_returnAMovieObjectWithTheGivenId() {
        // GIVEN
        Movie expected = new Movie("15432-3215", "Waschen Film", "Someone");
        // WHEN
        when(movieRepository.findById(expected.id())).thenReturn(Optional.of(expected));
        Movie actual = movieService.getMovieById(expected.id());
        // THEN
        verify(movieRepository).findById(expected.id());
        assertEquals(expected, actual);
    }

    @Test
    void deleteMovieById_whenExecuted_thenDeleteMovieObjectWithGivenId() {
        // GIVEN
        doNothing().when(movieRepository).deleteById(anyString());
        movieRepository.deleteById("15432-3215");
        //THEN
        verify(movieRepository, times(1)).deleteById("15432-3215");
    }
    @Test
    void updateMovie_returnTheUpdatedMovieObject() {
        // GIVEN
        Movie existingMovie = new Movie("15432-3215", "Katze", "Alex");
        Movie expected = new Movie("15432-3215", "Katzengejammer", "Luna");

        // WHEN
        when(movieRepository.save(any(Movie.class))).thenReturn(existingMovie);
        when(movieRepository.save(any(Movie.class))).thenReturn(expected);
        Movie actual = movieService.updateMovie(new Movie("15432-3215", "Katzengejammer", "Luna"));
        // THEN
        verify(movieRepository).save(expected);
        assertEquals(expected, actual);
    }
}