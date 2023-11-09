package org.example.backend;
import org.springframework.data.annotation.Id;

public record Movie(
        @Id
        String id,
        String title,
        String author
) {
}