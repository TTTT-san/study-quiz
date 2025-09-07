package com.portafolio.backend_quiz_app.model;

import java.util.List;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Data
@Entity
public class Quiz {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer difficulty; 
    private String text;
    // private Integer idOptionCorrect;
    private String help;
    @OneToMany(mappedBy = "quiz")
    private List<Opzione> options;

    @ManyToOne
    private Materia materia;
}
