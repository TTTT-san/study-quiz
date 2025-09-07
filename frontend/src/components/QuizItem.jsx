import { useState } from 'react';

const QuizItem = ({
  question = {
    id: 0,
    text: "Domanda di esempio?",
    options: [
      { id: 'a', text: "Opzione A", correct: true },
      { id: 'b', text: "Opzione B", correct: false },
      { id: 'c', text: "Opzione C", correct: false }
    ],
    help: "Nessun aiuto disponibile per questa domanda."
  },
  selectedAnswer = "",
  onAnswerChange = () => { },
  showResult = false,
  showHelp = false
}) => {
  const [isHelpVisible, setIsHelpVisible] = useState(false);
  const [localSelectedAnswer, setLocalSelectedAnswer] = useState(selectedAnswer);

  const isCorrect = showResult && selectedAnswer && question.options.find(o => o.id === selectedAnswer && o.correct);
  const isIncorrect = showResult && selectedAnswer && !question.options.find(o => o.id === selectedAnswer && o.correct);
  const isAnswered = !!selectedAnswer;
  const isUnanswered = showResult && !selectedAnswer;

  const currentSelectedAnswer = selectedAnswer || localSelectedAnswer;

  const handleOptionChange = (optionId) => {
    if (!showResult) {
      setLocalSelectedAnswer(optionId);
      onAnswerChange(question.id, optionId);
    }

  };


  return (
    <div className="bg-[var(--color-gray-800)] rounded-2xl shadow-lg overflow-hidden border border-[var(--color-gray-700)] transition-all duration-300 hover:shadow-xl">

      {/* Intestazione della Domanda */}
      <div className={`p-5 ${isCorrect ? 'bg-[var(--color-indigo-700)]' : isIncorrect || isUnanswered ? 'bg-[var(--color-red-900)]/20' : 'bg-[var(--color-gray-750)]'}`}>
        <div className="flex justify-between items-start">
          <h3 className="text-lg md:text-xl font-bold text-[var(--color-white)]">{question.pos}. {question.text}</h3>
          {/* Indicatore di stato */}
          <div className="flex-shrink-0 ml-2">
            {showResult && (
              <>
                {isCorrect && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--color-green-900)] text-[var(--color-green-200)]">
                    Corretta
                  </span>
                )}
                {(isIncorrect || isUnanswered) && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--color-red-900)] text-[var(--color-red-200)]">
                    {isUnanswered ? 'Senza Risposta' : 'Sbagliata'}
                  </span>
                )}
              </>
            )}
            {!showResult && isAnswered && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--color-blue-900)] text-[var(--color-blue-200)]">
                Risposta Data
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Corpo della Domanda */}
      <div className="p-5">
        <fieldset className="space-y-3" disabled={showResult}>
          <legend className="sr-only">Opzioni di risposta</legend>
          {question.options.map((option) => {
            const isSelected = currentSelectedAnswer === option.id;
            let labelClasses = "flex items-center p-4 rounded-xl transition-colors duration-200 cursor-pointer ";
            let radioClasses = "h-5 w-5 ";

            if (showResult) {
              if (option.correct) {
                labelClasses += "bg-[var(--color-green-900)]/30 border border-[var(--color-green-700)]";
                radioClasses += "text-[var(--color-green-500)]";
              } else if (!option.correct && isSelected) {
                labelClasses += "bg-[var(--color-red-900)]/30 border border-[var(--color-red-700)]";
                radioClasses += "text-[var(--color-red-500)]";
              } else {
                labelClasses += "opacity-70 cursor-default";
              }
            } else {
              if (isSelected) {
                labelClasses += "bg-[var(--color-blue-900)]/30 border border-[var(--color-blue-500)] ring-2 ring-[var(--color-blue-500)]";
              } else {
                labelClasses += "bg-[var(--color-gray-750)] hover:bg-[var(--color-gray-700)] border border-[var(--color-gray-700)]";
              }
              radioClasses += "text-[var(--color-blue-500)]";
            }

            return (
              <label
                key={`${question.id}-${option.id}`}
                className={labelClasses}
              >
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={option.id}
                  checked={isSelected}
                  onChange={() => handleOptionChange(option.id)}
                  className="sr-only"
                  disabled={showResult}
                />
                {/* Cerchio stilizzato per il radio button */}
                <span className={`${radioClasses} flex items-center justify-center rounded-full border ${isSelected ? 'border-[var(--color-blue-500)]' : 'border-[var(--color-gray-500)]'
                  }`}>
                  {isSelected && (
                    <span className="h-2 w-2 rounded-full bg-[var(--color-blue-500)]"></span>
                  )}
                </span>
                <span className="ml-3 text-[var(--color-gray-200)] font-medium">{option.text}</span>
              </label>
            );
          })}
        </fieldset>

        {/* Feedback Dettagliato (mostrato solo dopo la conferma) */}
        {showResult && (
          <div className={`mt-5 p-4 rounded-xl text-base ${isCorrect
            ? 'bg-[var(--color-green-900)]/20 text-[var(--color-green-300)] border border-[var(--color-green-800)]'
            : 'bg-[var(--color-red-900)]/20 text-[var(--color-red-300)] border border-[var(--color-red-800)]'
            }`}>
            {isCorrect ? (
              <div className="flex items-start">
                <span className="text-xl mr-2">✅</span>
                <span><span className="font-semibold">Ottimo!</span> La tua risposta è corretta.</span>
              </div>
            ) : (
              <div>
                <div className="flex items-start mb-2">
                  <span className="text-xl mr-2">❌</span>
                  <span>
                    {isUnanswered
                      ? <span className="font-semibold">Nessuna risposta selezionata.</span>
                      : <span className="font-semibold">La tua risposta è sbagliata.</span>
                    }
                  </span>
                </div>
                <div className="flex items-start">
                  <span className="text-xl mr-2">💡</span>
                  <span>La risposta corretta era: <span className="font-semibold">{question.options.find(opt => {
                    return opt.correct

                  })?.text || 'N/D'}</span></span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Sezione Aiuto */}
        <div className="mt-5 pt-5 border-t border-[var(--color-gray-700)]">

          {showHelp && (
            <>
              <button
                type="button"
                onClick={() => setIsHelpVisible(!isHelpVisible)}
                className="flex items-center text-sm font-medium text-[var(--color-amber-400)] hover:text-[var(--color-amber-300)] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-amber-500)] focus:ring-offset-2 focus:ring-offset-[var(--color-gray-800)] rounded-md px-2 py-1"
                aria-expanded={isHelpVisible}
                aria-controls={`help-content-${question.id}`}
              >
                <svg className={`w-4 h-4 mr-1 transition-transform duration-200 ${isHelpVisible ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
                {isHelpVisible ? 'Nascondi Aiuto' : 'Mostra Aiuto'}
              </button>
              {!isHelpVisible && (

                <div
                  id={`help-content-${question.id}`}
                  className="mt-3 p-4 bg-[var(--color-amber-900)]/20 border border-[var(--color-amber-700)] rounded-xl text-[var(--color-amber-200)] text-sm"
                >
                  <div className="flex">
                    <span className="text-base mr-2">💡</span>
                    <span>{question.help}</span>
                  </div>
                </div>
              )}
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default QuizItem;