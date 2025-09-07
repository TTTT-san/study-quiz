package com.portafolio.backend_quiz_app.restController;

import java.util.List;

import org.springframework.web.bind.annotation.RestController;

import com.portafolio.backend_quiz_app.dto.MateriaDto;
import com.portafolio.backend_quiz_app.service.MateriaService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@CrossOrigin(origins = "http://localhost:5173") 
public class MateriaController {
    
    @Autowired
    MateriaService materiaService;

    @GetMapping("/materie")
    public List<MateriaDto> getMaterie() {
        return materiaService.getMaterie();
    }

}
