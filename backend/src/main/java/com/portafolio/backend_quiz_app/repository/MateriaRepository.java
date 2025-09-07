package com.portafolio.backend_quiz_app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.portafolio.backend_quiz_app.model.Materia;

public interface MateriaRepository extends JpaRepository<Materia,Long> {

    
}
