import  { useState } from 'react';
import questionsData from '../data/questions.json'; // ייבוא שאלות

const QuizGame = () => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedDifficulty, setSelectedDifficulty] = useState('');
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [isQuizStarted, setIsQuizStarted] = useState(false);

    const startQuiz = () => {
        const filteredQuestions = questionsData.filter(
            question => question.category === selectedCategory && question.difficulty === selectedDifficulty
        );
        setQuestions(filteredQuestions);
        setCurrentQuestionIndex(0);
        setScore(0);
        setIsQuizStarted(true);
    };

    const handleAnswer = (answer) => {
        if (answer === questions[currentQuestionIndex].correctAnswer) {
            setScore(score + 1);
        }
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            alert(`סיימת את השאלון! ציון: ${score + 1}/${questions.length}`);
            setIsQuizStarted(false);
        }
    };

    return (
        <div className="quiz-game">
            {!isQuizStarted ? (
                <div>
                    <h2>בחר נושא ורמת קושי</h2>
                    <label>
                        נושא:
                        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                            <option value="">בחר נושא</option>
                            <option value="HTML">HTML</option>
                            <option value="CSS">CSS</option>
                            <option value="JavaScript">JavaScript</option>
                            <option value="React">React</option>
                        </select>
                    </label>
                    <label>
                        רמת קושי:
                        <select value={selectedDifficulty} onChange={(e) => setSelectedDifficulty(e.target.value)}>
                            <option value="">בחר רמת קושי</option>
                            <option value="easy">קל</option>
                            <option value="medium">בינוני</option>
                            <option value="advanced">מתקדם</option>
                        </select>
                    </label>
                    <button onClick={startQuiz}>התחל שאלון</button>
                </div>
            ) : (
                <div className="question-section">
                    <h3>{questions[currentQuestionIndex].question}</h3>
                    {questions[currentQuestionIndex].options.map((option, index) => (
                        <button key={index} onClick={() => handleAnswer(option)}>
                            {option}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default QuizGame;
