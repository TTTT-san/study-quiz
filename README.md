# Study-Quiz

## Descrizione
**Study-Quiz** è un'applicazione web che permette agli utenti di partecipare a quiz interattivi, attualmente limitati a domande a scelta multipla con una sola risposta corretta. In futuro è previsto il supporto per altre tipologie di quiz. Il backend è sviluppato con **Spring Boot** e **Hibernate** (ORM) su un database **MySQL**, mentre il frontend è realizzato con **React** e **Vite.js**.

## Funzionalità
- Selezione della materia.
- Configurazione della scheda quiz: numero di domande, difficoltà, aiuto.
- Visualizzazione delle domande del quiz.
- Correzione automatica e visualizzazione dei risultati.
- **To Do**: Implementazione delle funzionalità di Login e Registrazione.

## Architettura

### Backend
- **Tecnologie**: Spring Boot, Hibernate (ORM), MySQL

| Entità  | Attributi                                                                 |
|----------|---------------------------------------------------------------------------|
| Materia  | id: int, name: string, image_url: string                                   |
| Quiz     | id: int, idMateria: int, level: int, text: string, help: string          |
| Opzione  | id: string, text: string, quizId: int, isCorrect: boolean                |

### Esempi di Dati
- **Materia**
  | id | name       | image_url                                   |
  |----|------------|---------------------------------------------|
  | 1  | Matematica | https://placehold.co/600x400?text=Matematica |

- **Quiz**
  | id | idMateria | level | text                   | help                                      |
  |----|-----------|-------|------------------------|-------------------------------------------|
  | 0  | 1         | 2     | Domanda di esempio?     | Nessun aiuto disponibile per questa domanda. |

- **Opzione**
  | id | text       | quizId | isCorrect |
  |----|------------|--------|-----------|
  | a  | Opzione A  | 0      | false     |
  | b  | Opzione B  | 0      | true      |
  | c  | Opzione C  | 0      | false     |

### Relazioni
1. **Materia (1) ↔ Quiz (N)**  
   - Una materia può avere **molti quiz**, mentre un quiz è associato a **una sola materia**.

2. **Quiz (1) ↔ Opzione (N)**  
   - Un quiz può avere **molte opzioni**, mentre un'opzione è associata a **un solo quiz**.

### API
- **GET /materie**: Restituisce tutte le materie disponibili.
- **GET /quiz?idMateria**: Restituisce i quiz associati a una specifica materia.
  - **Esempio di richiesta**:
    ```
    GET http://localhost:8080/api/quiz?idMateria=2
    ```

- **POST /quiz**: Genera quiz in base alla configurazione fornita dall'utente.
  - **Esempio di richiesta**:
    ```
    POST http://localhost:8080/api/quiz
    Content-Type: application/json
    {
      "materiaId": 2,
      "materia": "React",
      "difficulty": 2,
      "numQuestions": 10,
      "help": true
    }
    ```

## User Flow
1. **Home Page**
   - Accesso all'applicazione.
   - Opzioni: Inizio Quiz.
   
2. **Selezione della Materia**
   - Visualizzazione e selezione delle materie disponibili.

3. **Configurazione del Quiz**
   - Selezione del numero di domande, livello di difficoltà e aiuto.

4. **Visualizzazione del Quiz**
   - Risposta alle domande del quiz a scelta multipla.

5. **Completamento del Quiz**
   - Correzioni delle risposte e visualizzazione dei risultati.

## Setup e Avvio

### Backend
1. Crea il database `quiz` in MySQL:
   ```sql
     CREATE DATABASE quiz;
   ```

2. Configura `application.properties`:

   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/quiz
   spring.datasource.username=<tuo-username>
   spring.datasource.password=<tua-password>
   spring.jpa.hibernate.ddl-auto=create
   ```
3. Assicurati di usare `@CrossOrigin` nei controller per consentire richieste dal frontend:

   ```java
   @RestController
   @RequestMapping("/api")
   @CrossOrigin(origins = "http://localhost:5173")
   public class QuizRestController {
       // endpoint qui
   }
   ```
4. Avvia il backend:

   ```bash
   mvn spring-boot:run
   ```

### Frontend

1. Crea e aggiorna con url del backend `.env` alla radice:

   ```env
   VITE_API_BASE=http://localhost:8080
   ```
2. Installa dipendenze e avvia:

   ```bash
   npm install
   npm run dev
   ```

