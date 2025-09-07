import { useState, useContext } from 'react';
import { ContextQuiz } from '../hook/ContextQuiz';

const QuizConfigForm = ({ materiaName = "Generale", materiaId = 0, onGenerate }) => {

  const { quizConfig, setQuizConfig } = useContext(ContextQuiz);

  const [formData, setFormData] = useState({
    difficulty: '1',
    numQuestions: '10',
    help: 'false'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    console.log(formData.difficulty)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const quizConfigUser = {
      materiaId: materiaId,
      materia: materiaName,
      difficulty: formData.difficulty,
      numQuestions: parseInt(formData.numQuestions, 10),
      help: formData.help === 'true'
    };

    setQuizConfig(q => setQuizConfig(quizConfigUser))

    console.log("Dati configurazione quiz:", quizConfig);

    if (onGenerate) onGenerate(quizConfigUser);
  };

  return (
    <div className="min- flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-4 ">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
        <div className="bg-gray-750 border-b border-gray-700 py-5 text-center">
          <h1 className="text-2xl font-bold text-white">Configura Quiz</h1>
          <p className="text-indigo-400 mt-1">Materia: {materiaName}</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Selettore Difficoltà */}
          <div>
            <label className="block text-gray-300 font-medium mb-3">
              Livello di Difficoltà
            </label>
            <div className="grid grid-cols-4 gap-4">
              {[
                { value: '1', label: 'Facile', icon: '⭐' },
                { value: '2', label: 'Medio', icon: '⭐⭐' },
                { value: '3', label: 'Difficile', icon: '⭐⭐⭐' },
                { value: '0', label: 'Mix', icon: '' }
              ].map((level) => (
                <label
                  key={level.value}
                  className={`flex flex-col items-center justify-center p-3 rounded-lg border cursor-pointer transition duration-200 ${formData.difficulty === level.value
                    ? 'bg-indigo-600 border-indigo-500 text-white'
                    : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-650'
                    }`}
                >
                  <input
                    type="radio"
                    name="difficulty"
                    value={level.value}
                    checked={formData.difficulty === level.value}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <span className="text-lg">{level.icon}</span>
                  <span className="text-xs mt-1">{level.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Numero di Domande */}
          <div>
            <label htmlFor="numQuestions" className="block text-gray-300 font-medium mb-2">
              Numero di Domande
            </label>
            <input
              id="numQuestions"
              name="numQuestions"
              type="number"
              min="1"
              max="50"
              value={formData.numQuestions}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 font-medium mb-3">
              Vuoi abilitare gli aiuti?
            </label>
            <div className="flex space-x-6">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="help"
                  value="true"
                  checked={formData.help === 'true'}
                  onChange={handleChange}
                  className="h-5 w-5 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2 text-gray-300">Sì</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="help"
                  value="false"
                  checked={formData.help === 'false'}
                  onChange={handleChange}
                  className="h-5 w-5 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2 text-gray-300">No</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-lg shadow-lg transform transition duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Genera Quiz
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuizConfigForm;