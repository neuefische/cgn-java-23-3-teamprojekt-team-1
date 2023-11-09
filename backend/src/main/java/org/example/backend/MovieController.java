package org.example.backend;

import lombok.*;
import org.springframework.web.bind.annotation.*;

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
        movieService.delete(id);
    }
}