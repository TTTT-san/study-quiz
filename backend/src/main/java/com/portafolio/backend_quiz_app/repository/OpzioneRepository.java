package com.portafolio.backend_quiz_app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.portafolio.backend_quiz_app.model.Opzione;
import com.portafolio.backend_quiz_app.model.Quiz;

import java.util.List;


public interface OpzioneRepository extends JpaRepository<Opzione,Long> {
    
    List<Opzione> findByQuiz(Quiz quiz);
}
