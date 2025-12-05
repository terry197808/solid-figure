import React, { useState, useEffect, useRef } from 'react';
import { generateQuizQuestion } from '../services/geminiService';
import { QuizQuestion } from '../types';

export const QuizTime: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  
  // Ref to track if component is mounted
  const mountedRef = useRef(false);
  
  // Ref to store the promise of the NEXT question (Pre-fetching)
  const nextQPromiseRef = useRef<Promise<QuizQuestion> | null>(null);

  useEffect(() => {
    mountedRef.current = true;
    loadNewQuestion();
    return () => {
      mountedRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadNewQuestion = async () => {
    if (!mountedRef.current) return;
    setLoading(true);
    setSelectedOption(null);
    setIsCorrect(null);
    
    let q: QuizQuestion;

    try {
      // 1. Check if we have a pre-fetched question ready
      if (nextQPromiseRef.current) {
        q = await nextQPromiseRef.current;
        nextQPromiseRef.current = null; // Consume it
      } else {
        // 2. If not, fetch one now
        q = await generateQuizQuestion();
      }
      
      if (mountedRef.current) {
        setCurrentQuestion(q);
        setLoading(false);
        
        // 3. Immediately start fetching the NEXT question in the background
        nextQPromiseRef.current = generateQuizQuestion();
      }
    } catch (error) {
       console.error("Error loading question", error);
       // Retry once if failed
       const retryQ = await generateQuizQuestion();
       if (mountedRef.current) {
          setCurrentQuestion(retryQ);
          setLoading(false);
       }
    }
  };

  const handleOptionClick = (option: string) => {
    if (selectedOption || !currentQuestion) return;
    
    setSelectedOption(option);
    const correct = option === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    if (correct) {
      setScore(s => s + 1);
    }
  };

  return (
    <div className="animate-fade-in max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
         <h2 className="text-3xl font-bold text-gray-800">小小数学家挑战</h2>
         <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full font-bold shadow-sm">
            🌟 得分: {score}
         </div>
      </div>

      {loading && (
         <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mb-4"></div>
            <p className="text-purple-600 font-medium animate-pulse">正在出题中...</p>
         </div>
      )}

      {!loading && currentQuestion && (
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden animate-slide-up">
           {/* Question Header */}
           <div className="bg-purple-600 p-8 text-white">
              <h3 className="text-2xl font-bold leading-normal">{currentQuestion.question}</h3>
           </div>

           {/* Options */}
           <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentQuestion.options?.map((option, idx) => {
                 let btnClass = "p-4 text-xl font-bold rounded-xl border-2 transition-all duration-200 shadow-sm ";
                 
                 if (selectedOption === null) {
                    btnClass += "bg-white border-gray-200 hover:border-purple-400 hover:bg-purple-50 text-gray-700 active:scale-95";
                 } else if (option === currentQuestion.correctAnswer) {
                    btnClass += "bg-green-100 border-green-500 text-green-700 scale-105 shadow-md"; // Always show correct
                 } else if (selectedOption === option && option !== currentQuestion.correctAnswer) {
                    btnClass += "bg-red-100 border-red-500 text-red-700 opacity-70"; // Wrong selection
                 } else {
                    btnClass += "bg-gray-50 border-gray-100 text-gray-300"; // Others
                 }

                 return (
                    <button
                      key={idx}
                      onClick={() => handleOptionClick(option)}
                      disabled={selectedOption !== null}
                      className={btnClass}
                    >
                      {option}
                    </button>
                 );
              })}
           </div>

           {/* Feedback Area */}
           {selectedOption && (
             <div className="p-6 mx-8 mb-8 rounded-xl bg-gray-50 border border-gray-100 animate-fade-in">
                <div className={`flex items-start gap-4 p-4 rounded-xl mb-4 ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                   <div className="text-4xl">
                     {isCorrect ? '🎉' : '🤔'}
                   </div>
                   <div>
                     <h4 className={`text-xl font-bold mb-1 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                        {isCorrect ? '太棒了，答对了！' : '再接再厉哦！'}
                     </h4>
                     <p className="text-gray-600">
                        {currentQuestion.explanation}
                     </p>
                   </div>
                </div>
                <div className="text-right">
                   <button 
                      onClick={loadNewQuestion}
                      className="bg-purple-600 text-white px-8 py-3 rounded-full font-bold hover:bg-purple-700 transition-colors shadow-lg hover:shadow-xl active:scale-95 flex items-center gap-2 ml-auto"
                   >
                      <span>下一题</span>
                      <span>➡️</span>
                   </button>
                </div>
             </div>
           )}
        </div>
      )}
    </div>
  );
};