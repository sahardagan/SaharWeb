import './Home.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ייבוא useNavigate

const Home = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate(); // יצרנו משתנה navigate

    useEffect(() => {
        // בדיקה האם המשתמש מחובר לפי ה-localStorage
        const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
        setIsLoggedIn(loggedInStatus);
    }, []);

    const startGame = () => {
        navigate('/game1'); // פנה לדף המשחק
    };

    return (
        <div className="home">
            <h1>ברוך הבא לאתר הלמידה שלנו!</h1>
            {isLoggedIn ? (
                <div className="games-grid">
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className="game-card">
                            <h2>משחק {index + 1}</h2>
                            <p>משחק מהנה שיעזור לך ללמוד נושא חשוב ב-Full Stack!</p>
                            <button 
                                className="start-game-button" 
                                onClick={index === 0 ? startGame : null} // קישור למשחק הראשון
                            >
                                {index === 0 ? 'התחל משחק 1' : 'התחל משחק'}
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="login-prompt">אנא התחבר עם Google כדי לצפות במשחקים שלנו.</p>
            )}
        </div>
    );
};

export default Home;
