package com.example.backend.repository;
import com.example.backend.entity.Note;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface NoteRepository 
    extends MongoRepository<Note, String> {
}