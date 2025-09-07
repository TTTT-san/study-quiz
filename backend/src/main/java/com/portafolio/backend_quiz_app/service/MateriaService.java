package com.portafolio.backend_quiz_app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.portafolio.backend_quiz_app.dto.MateriaDto;
import com.portafolio.backend_quiz_app.model.Materia;
import com.portafolio.backend_quiz_app.repository.MateriaRepository;

@Service
public class MateriaService {

    @Autowired
    MateriaRepository materiaRepository;

    public List<MateriaDto> getMaterie() {
        List<Materia> materie = materiaRepository.findAll();
        if (materie.isEmpty()) {
            System.out.println("MateriaController: Non ci sono materie");
        }
        List<MateriaDto> lMateriaDtos = materie.stream().map((m) -> new MateriaDto(m.getId(),
        m.getName(),m.getImageUrl(),null)).toList();

        return lMateriaDtos;
    }
}
