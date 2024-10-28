import  { useState, useEffect } from 'react';
import './Game1.css';

const Game1 = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);

    useEffect(() => {
        const loadQuestions = async () => {
            const response = await fetch('/src/data/questions.json'); // נתיב לקובץ JSON
            const data = await response.json();
            setQuestions(data);
        };
        loadQuestions();
    }, []);

    const handleAnswerOptionClick = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1);
        }
        const nextQuestion = currentQuestionIndex + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestionIndex(nextQuestion);
        } else {
            setShowScore(true);
        }
    };

    return (
        <div className="game1">
            {showScore ? (
                <div>
                    <h1>סיימת את המשחק!</h1>
                    <p>ניקוד שלך: {score} מתוך {questions.length}</p>
                </div>
            ) : (
                <div>
                    <h1>משחק 1: שאלות על HTML</h1>
                    {questions.length > 0 ? (
                        <>
                            <p>{questions[currentQuestionIndex].question}</p>
                            <div className="answers">
                                {questions[currentQuestionIndex].answers.map((answer, index) => (
                                    <button 
                                        key={index} 
                                        className="answer-button" 
                                        onClick={() => handleAnswerOptionClick(answer.correct)}
                                    >
                                        {answer.text}
                                    </button>
                                ))}
                            </div>
                        </>
                    ) : (
                        <p>טוען שאלות...</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Game1;
