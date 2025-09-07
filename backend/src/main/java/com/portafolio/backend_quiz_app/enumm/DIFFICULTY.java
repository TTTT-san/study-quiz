package com.portafolio.backend_quiz_app.enumm;

public enum DIFFICULTY {

    EASY(1),
    MEDIUM(2),
    HARD(3),
    MIX(4);

    private final int value;

    DIFFICULTY(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }

}
