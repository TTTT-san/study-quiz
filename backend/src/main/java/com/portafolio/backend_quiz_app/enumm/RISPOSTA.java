
package com.portafolio.backend_quiz_app.enumm;


public enum  RISPOSTA {
    A('a'),
    B('b'),
    C('c');

    private final Character c;

    RISPOSTA(Character c) {
        this.c = c;
    }

    public Character getInfo() {
        return c;
    }
}
