package com.portafolio.backend_quiz_app.model;

import com.portafolio.backend_quiz_app.enumm.DIFFICULTY;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuizConfig {
    private Long materiaId;
    private String materia;
    private DIFFICULTY difficulty;
    private int numQuestions;
    private boolean help;
}
