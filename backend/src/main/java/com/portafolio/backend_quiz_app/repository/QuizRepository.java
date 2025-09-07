package com.portafolio.backend_quiz_app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.portafolio.backend_quiz_app.model.Materia;
import com.portafolio.backend_quiz_app.model.Quiz;

public interface QuizRepository extends JpaRepository<Quiz, Long> {

    List<Quiz> findByMateria(Materia materia);

    // SELECT q.* FROM Quiz q WHERE q.materia_id = 1 AND q.difficulty = 1
    @Query("SELECT q FROM Quiz q WHERE q.materia.id = :materiaId AND q.difficulty = :difficulty")
    List<Quiz> findQuizzesByMateriaAndDifficulty(@Param("materiaId") Long materiaId,
            @Param("difficulty") int difficulty);

}
