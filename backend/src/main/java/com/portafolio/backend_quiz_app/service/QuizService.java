package com.portafolio.backend_quiz_app.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.portafolio.backend_quiz_app.repository.OpzioneRepository;
import com.portafolio.backend_quiz_app.repository.QuizRepository;
import com.portafolio.backend_quiz_app.dto.OpzioneDto;
import com.portafolio.backend_quiz_app.dto.QuizConfigDto;
import com.portafolio.backend_quiz_app.dto.QuizDto;
import com.portafolio.backend_quiz_app.enumm.DIFFICULTY;
import com.portafolio.backend_quiz_app.model.Materia;
import com.portafolio.backend_quiz_app.model.Opzione;
import com.portafolio.backend_quiz_app.model.Quiz;
import com.portafolio.backend_quiz_app.model.QuizConfig;

@Service
public class QuizService {
    @Autowired
    QuizRepository quizRepository;

    @Autowired
    OpzioneRepository opzioneRepository;

    public List<QuizDto> getQuizByIdMateria(Materia materia) {

        if (materia == null) {
            System.out.println("QuizService | materia is null");
            return new ArrayList<>();
        }

        List<Quiz> quizs = quizRepository.findByMateria(materia);

        List<QuizDto> listQuizDTOs = quizs.stream()
                .map(quiz -> new QuizDto(quiz.getId(), quiz.getDifficulty(), quiz.getText(),
                        quiz.getHelp(),
                        getOptioneByQuiz(quiz),
                        quiz.getMateria().getId()))
                .toList();

        if (listQuizDTOs == null) {
            System.out.println("QuizService | Lista quizs is null");
            return new ArrayList<>();
        }

        System.out.println("Numero Quiz: " + listQuizDTOs.size());

        return listQuizDTOs;

    }

    public List<QuizDto> getQuizByConfig(QuizConfigDto quizConfigDto) {

        List<QuizDto> listQuizDTOs;
        if (quizConfigDto.getMateriaId() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Materia ID non può essere null");
        }
        System.out.println(quizConfigDto);
        // Recupero dei Quiz By idMATERIA e Difficulty e numQuestion
        DIFFICULTY difficulty = switch (quizConfigDto.getDifficulty()) {
            case 1 -> DIFFICULTY.EASY;
            case 2 -> DIFFICULTY.MEDIUM;
            case 3 -> DIFFICULTY.HARD;
            default -> DIFFICULTY.MIX;
        };

        QuizConfig quizconfig = new QuizConfig(quizConfigDto.getMateriaId(), quizConfigDto.getMateria(), difficulty,
                quizConfigDto.getNumQuestions(), quizConfigDto.isHelp());

        if (difficulty == DIFFICULTY.MIX) {
            Materia materia = new Materia();
            materia.setId(quizconfig.getMateriaId());
            listQuizDTOs = getQuizByIdMateria(materia);
            return listQuizDTOs;
        }

        // Recupero i quiz
        List<Quiz> quizs = quizRepository.findQuizzesByMateriaAndDifficulty(quizconfig.getMateriaId(),
                quizconfig.getDifficulty().getValue());

        if (quizs == null) {
            System.out.println("QuizService | Lista quizs is null");
            return new ArrayList<>();
        }
        System.out.println("q: " + quizs.size());

        listQuizDTOs = quizs.stream()
                .map(quiz -> new QuizDto(quiz.getId(), quiz.getDifficulty(), quiz.getText(),
                        quiz.getHelp(),
                        getOptioneByQuiz(quiz),
                        quiz.getMateria().getId()))
                .toList();

        return listQuizDTOs;
    }

    private List<OpzioneDto> getOptioneByQuiz(Quiz quiz) {

        List<Opzione> opziones = opzioneRepository.findByQuiz(quiz);
        System.out.println("Opzions sieze: " + opziones.size());

        List<OpzioneDto> listOpizoneDto = new ArrayList<>();

        for (Opzione opzione : opziones) {
            OpzioneDto opzioneDto = new OpzioneDto(opzione.getId(), opzione.getQuiz().getId(), opzione.getText(),
                    opzione.isCorrect());
            listOpizoneDto.add(opzioneDto);
        }
        Collections.shuffle(listOpizoneDto);

        return listOpizoneDto;
    }

}
