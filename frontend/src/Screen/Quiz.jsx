import { useContext, useState, useEffect } from 'react';
import QuizItem from '../components/QuizItem';
import { Header } from '../components/Header';
import { ContextQuiz } from '../hook/ContextQuiz';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { BASE_API } from '../costanti';
import axios from 'axios';

const QuizScreen = () => {
  const navigate = useNavigate()
  const { materiaId } = useParams()
  console.log("materiaId", materiaId)

  const { quizConfig, setQuizConfig } = useContext(ContextQuiz);
  console.log("quizConfig", JSON.stringify(quizConfig))

  const [quizData, setQuizData] = useState({});
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const postConfigQuiz = async () => {

      try {
        const response = await axios.post(`${BASE_API}/api/quizs`, quizConfig);
        console.log('Risposta dal server:', response.data);

        let questionsData = response.data;
        console.log("===== qData",questionsData)
        console.log("quizs number: ",questionsData?.length)

        const questionsDataShuffled = questionsData
          .map(value => ({ value, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ value }) => value)

        questionsData = questionsDataShuffled?.map((elem, index) => ({ ...elem, pos: index + 1 }))
        setQuizData(data => ({
          title: `Quiz di ${quizConfig?.materia}`,
          questions: questionsData.slice(0, Math.min(questionsData.length, quizConfig?.numQuestions)) || []
        }))
      } catch (error) {
        console.error('Errore durante la richiesta POST:', error);
      }


    }
    postConfigQuiz();
  }, [])



  const handleAnswerChange = (questionId, selectedOptionId) => {
    setUserAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: selectedOptionId,
    }));
  };
  const calculateResult = () => {
    const totalQuestions = quizData.questions.length;
    const correctAnswers = Object.keys(userAnswers).filter(questionId => {
      const selectedOptionId = userAnswers[questionId];
      const correctAnswer = quizData.questions.find(q => {
        // console.log("selectoptionid", selectedOptionId)
        return q.options.find(o => o.id === selectedOptionId && o.correct)
      })
        ;
      return correctAnswer;
    }).length;

    const score = (correctAnswers / totalQuestions) * 100;

    return {
      totalQuestions,
      correctAnswers,
      score,
    };
  };

  let finalResult;
  if (showResults) {
    finalResult = calculateResult()
    console.log(finalResult);

  }


  const handleSubmit = () => {
    console.log("Risposte dell'utente:", userAnswers);
    setShowResults(true);
  };

  const backNavigation = () => {
    navigate("/")
  };
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100">
      <Header />
      <div className="max-w-4xl mx-auto w-[80vw] m-">
        {/* Titolo del Quiz */}
        <div className="mb-8 bg-gray-800/50 border border-gray-700 shadow-lg">
          <div className="text-center py-6">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              {quizData?.title || "Titolo non trovato"}
            </h1>
          </div>
        </div>

        {/* Lista delle Domande */}
        <div className="space-y-6 mb-8 w-full">
          {(!quizData.questions || quizData.questions.length === 0) && (
            <div className="text-center p-4">
              <h3 className="text-lg font-semibold text-red-600">
                Attenzione: Quiz non trovati, tornare in home
              </h3>
              <Link to="/" className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                Torna alla Home
              </Link>
            </div>

          )}

          {quizData.questions?.map((question) => (
            <QuizItem
              key={question.id}
              question={question}
              selectedAnswer={userAnswers[question.id]}
              onAnswerChange={handleAnswerChange}
              showResult={showResults}
              showHelp={quizConfig?.help}
            />
          ))}
        </div>

        {!showResults && (
          <div className="flex justify-center">
            <button
              className={`bg-purple-800/80 px-8 py-3 rounded-full font-bold text-lg shadow-lg transition-all duration-300 transform ${Object.keys(userAnswers).length === 0 ? 'cursor-not-allowed opacity-50' : 'hover:bg-purple-700 hover:shadow-xl hover:-translate-y-0.5'}`}
              onClick={handleSubmit}
              disabled={Object.keys(userAnswers).length === 0}
            >
              Conferma Risposte
            </button>
          </div>
        )}

        {showResults && (
          <div className="bg-gray-800/50 border border-gray-700 shadow-lg mt-8">
            <div className="text-center py-6">
              <h2 className="text-2xl font-bold mb-4 text-green-400">Quiz Completato!</h2>
              <p className="text-gray-300">
                Risposte Corrette: <span className="font-semibold">{finalResult?.correctAnswers}</span>/{finalResult?.totalQuestions}
              </p>
              <p className="text-gray-300 mb-4">
                Punteggio: <span className="font-semibold">{((finalResult?.correctAnswers / finalResult?.totalQuestions) * 100).toFixed(2)}%</span>
              </p>
              {finalResult?.correctAnswers / finalResult?.totalQuestions >= 0.7 ? (
                <p className="text-green-400 font-bold">Ottimo lavoro!</p>
              ) : (
                <p className="text-red-400 font-bold">Hai bisogno di migliorare!</p>
              )}
              {/* Puoi aggiungere qui statistiche generali, come il numero di risposte corrette */}
              <div className="flex justify-center mt-4">
                <button
                  className={`bg-purple-800/80 px-8 py-3 rounded-full font-bold text-lg shadow-lg transition-all duration-300 transform ${Object.keys(userAnswers).length === 0 ? 'cursor-not-allowed opacity-50' : 'hover:bg-purple-700 hover:shadow-xl hover:-translate-y-0.5'}`}
                  onClick={backNavigation}
                  disabled={Object.keys(userAnswers).length === 0}
                >
                  Finito
                </button>

              </div>
            </div>
          </div>
        )}
      </div>
    </div>

  );
};

export default QuizScreen;