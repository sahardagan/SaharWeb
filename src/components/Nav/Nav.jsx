import './Nav.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

const Nav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // בדיקה של ה-localStorage בעת טעינת המרכיב
        const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
        setIsLoggedIn(loggedInStatus);
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    const handleLoginSuccess = (credentialResponse) => {
        console.log('Logged in successfully:', credentialResponse);
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true');
        navigate('/'); // מעבר אוטומטי ל-home לאחר התחברות
        window.location.reload(); // רענון העמוד לאחר כניסה
    };

    const handleLoginError = () => {
        console.log('Login Failed');
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
        navigate('/'); // מעבר אוטומטי ל-home לאחר התנתקות
        window.location.reload(); // רענון העמוד לאחר כניסה
    };

    return (
        <nav className="nav">
            <div className="nav-container">
                <button className="nav-toggle" onClick={toggleMenu}>
                    ☰ 
                </button>
                <div className={`nav-links ${isOpen ? 'open' : ''}`}>
                    {isOpen && (
                        <button className="nav-close" onClick={closeMenu}>
                            ✖ 
                        </button>
                    )}
                    {!isLoggedIn && (
                        <>
                            <a href="/register">הרשמה</a>
                            {isOpen && (
                                <a href="./login">התחברות</a>
                            )}
                        </>
                    )}
                </div>
                {!isLoggedIn && <a href="/register" className="register-button">הרשמה</a>}
                {!isLoggedIn && (
                    <GoogleLogin
                        onSuccess={handleLoginSuccess}
                        onError={handleLoginError}
                    />
                )}
                {isLoggedIn && <button onClick={handleLogout}>התנתקות</button>}
            </div>
        </nav>
    );
};

export default Nav;
