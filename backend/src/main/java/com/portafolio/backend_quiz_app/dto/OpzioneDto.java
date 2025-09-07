package com.portafolio.backend_quiz_app.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OpzioneDto {
    private Long id;
    private Long quizId;
    private String text;
    private boolean isCorrect;
}
