package org.example.backend;

import org.junit.jupiter.api.Test;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import java.util.List;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@AutoConfigureMockMvc
class MovieControllerTest {

    private final static String BASE_URI = "/api/movies";

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @DirtiesContext
    void retrievingAllMoviesWhenNoMoviesExist_ReturnsEmptyList() throws Exception {
        mockMvc.perform(get(BASE_URI))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @Test
    @DirtiesContext
    void getAllMoviesWithOneEntryInDatabase_ExpectStatus200AndReturnEntryAsJson() throws Exception {
        Movie movie = new Movie("15432-3215", "Waschen Film", "Someone");
        String movieAsJson = objectMapper.writeValueAsString(movie);

        MvcResult result = mockMvc.perform(post(BASE_URI)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(movieAsJson)
                )
                .andExpect(status().isOk())
                .andReturn();

        Movie savedMovie = objectMapper.readValue(result.getResponse().getContentAsString(), Movie.class);

        List<Movie> movies = List.of(savedMovie);
        String moviesAsJson = objectMapper.writeValueAsString(movies);

        mockMvc.perform(get(BASE_URI))
                .andExpect(status().isOk())
                .andExpect(content().json(moviesAsJson));
    }

    @Test
    @DirtiesContext
    void retrievingAllMoviesWhenMoviesExist_ReturnList() throws Exception {
        Movie movie1 = new Movie("15432-3215", "Waschen Film", "Someone");
        Movie movie2 = new Movie("3215-15432", "Putzen Film", "Someone else");
        List<Movie> expected = List.of(movie1, movie2);

        mockMvc.perform(post(BASE_URI)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(movie1)))
                .andExpect(status().isOk());

        mockMvc.perform(post(BASE_URI)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(movie2)))
                .andExpect(status().isOk());

        MvcResult result = mockMvc.perform(get(BASE_URI))
                .andExpect(status().isOk())
                .andReturn();

        String actual = result.getResponse().getContentAsString();
        assertEquals(objectMapper.writeValueAsString(expected), actual);
    }

    @Test
    void addMovieShouldReturnSameMovie() throws Exception {
        // GIVEN
        Movie movie = new Movie("15432-3215", "Waschen Film", "Someone");
        Movie expected = new Movie("15432-3215", "Waschen Film", "Someone");
        // WHEN
        MvcResult result = mockMvc.perform(post(BASE_URI)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(movie)))
                .andExpect(status().isOk())
                .andReturn();

        Movie actual = objectMapper.readValue(result.getResponse().getContentAsString(), Movie.class);
        // THEN
        assertEquals(expected, actual);
    }
}