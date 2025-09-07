package com.portafolio.backend_quiz_app.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuizConfigDto {
    private Long materiaId;
    private String materia;
    private int difficulty;
    private int numQuestions;
    private boolean help;
}
