package com.portafolio.backend_quiz_app.restController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.portafolio.backend_quiz_app.dto.QuizConfigDto;
import com.portafolio.backend_quiz_app.dto.QuizDto;
import com.portafolio.backend_quiz_app.model.Materia;
import com.portafolio.backend_quiz_app.service.QuizService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173") 
public class QuizRestController {

    @Autowired
    QuizService quizService;

    @GetMapping("/quizs")
    public List<QuizDto> getQuizByIdMateria(@RequestParam("idMateria") Long IdMateria) {

        System.out.println("QuizRestC | getQuizByIdMateria start");

        Materia materia = new Materia();
        materia.setId(IdMateria);

        List<QuizDto> listQuizDTOs = quizService.getQuizByIdMateria(materia);

        System.out.println("QuizRestC | getQuizByIdMateria end, Size: " + listQuizDTOs.size());

        return listQuizDTOs;
    }

    @PostMapping("/quizs")
    public List<QuizDto> getQuizByConfig(@RequestBody QuizConfigDto quizConfigDto) {

        System.out.println("QuizRestC | getQuizByIdMateria start");
        List<QuizDto> lsitaQuizs = quizService.getQuizByConfig(quizConfigDto);
        System.out.println("QuizRestC | getQuizByIdMateria end, SizeNODTO: " + lsitaQuizs.size());
        return lsitaQuizs;
    }

}
