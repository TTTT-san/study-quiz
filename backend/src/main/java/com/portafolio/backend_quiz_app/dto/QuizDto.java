package com.portafolio.backend_quiz_app.dto;

import java.util.List;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



@Data
@AllArgsConstructor
@NoArgsConstructor
public class QuizDto {
    private Long id;
    private Integer difficulty;
    private String text;
    // private Integer idOptionCorrect;
    private String help;
    private List<OpzioneDto> options;
    private Long materiaId;

  
}
