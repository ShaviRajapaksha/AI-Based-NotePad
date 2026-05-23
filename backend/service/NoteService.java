package com.example.backend.service;

import com.example.backend.entity.Note;
import com.example.backend.repository.NoteRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class NoteService {

    private final NoteRepository noteRepository;

    public NoteService(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    public List<Note> getAllNotes() {
        return noteRepository.findAll();
    }

    public Note create(Note note) {

        note.setCreatedAt(LocalDateTime.now());
        note.setUpdatedAt(LocalDateTime.now());

        return noteRepository.save(note);
    }

    public Note update(String id, Note note) {

        Note existing =
                noteRepository.findById(id)
                        .orElseThrow();

        existing.setTitle(note.getTitle());
        existing.setContent(note.getContent());

        existing.setUpdatedAt(LocalDateTime.now());

        return noteRepository.save(existing);
    }

    public void delete(String id) {
        noteRepository.deleteById(id);
    }
}