package org.example.backend;

import lombok.*;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/movies")
public class MovieController {
    private final MovieService movieService;

    @GetMapping
    public List<Movie> getAllMovies() {
        return movieService.getAllMovies();
    }

    @PostMapping
    public Movie addMovie(@RequestBody Movie movie) {
        return movieService.addMovie(movie);
    }

    @GetMapping("{id}")
    public Movie getMovieById(@PathVariable String id) {
       return movieService.getMovieById(id);
    }

    @DeleteMapping("{id}")
    public void deleteMovieById(@PathVariable String id) {
        movieService.deleteMovie(id);
    }
    @PutMapping(path = {"{id}/update", "{id}"})
    Movie updateMovieID(@PathVariable String id, @RequestBody Movie movie) {
        if (!movie.id().equals(id)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "The id in the url does not match the request body's id");
        }
        return movieService.updateMovie(movie);
    }
}

