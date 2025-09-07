import { useState, createContext } from 'react';

export const ContextQuiz = createContext();

export const ProviderQuiz = ({ children }) => {
  const [quizConfig, setQuizConfig] = useState(
    {
      quizData: null
    }
  );

  return (
    <ContextQuiz.Provider value={{ quizConfig, setQuizConfig }}>
      {children}
    </ContextQuiz.Provider>
  )
}