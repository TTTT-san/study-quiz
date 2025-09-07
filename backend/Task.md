Modelli:
- Materia
  { 
    id: 1, 
    name: 'Matematica', 
    image: 'https://placehold.co/600x400?text=Matematica' 
  }

- Quiz
  { 
    id: 0, 
    idMateria: 1, 
    level: 2, // (1-3) 
    text: "Domanda di esempio?", 
    help: "Nessun aiuto disponibile per questa domanda." 
  }

- Opzione
  { 
    id: 'a', 
    text: "Opzione A", 
    quizId: 0 
    isCorrect: false
  }

Relazione:
- Materia 1:N Quiz --> Una materia può avere più quiz e un quiz è associato solamente alla materia.
- Opzione N:1 Quiz --> Un quiz può avere più opzioni, ma un'opzione può essere associata a un quiz.








GET /materie --> per avere tutte le materie
GET /quizs?idMateria  --> per ottenere i quiz 

POST /quizs   --> per ottnere quiz in base al config quiz