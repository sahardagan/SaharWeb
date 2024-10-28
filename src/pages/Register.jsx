import { useState } from 'react';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const toggleShowPassword = () => setShowPassword(!showPassword);
    const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setErrorMessage("סיסמאות לא תואמות");
            return;
        }
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('User registered:', data);
                setIsLoggedIn(true);
                setErrorMessage('');
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message);
            }
        } catch (error) {
            console.error('Error during registration:', error);
            setErrorMessage('שגיאה בהרשמה. אנא נסה שוב מאוחר יותר.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <h2>{isLoggedIn ? "התחברת בהצלחה!" : "הרשמה"}</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {!isLoggedIn ? (
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        placeholder="שם משתמש" 
                        required 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                    <input 
                        type="email" 
                        placeholder='כתובת דוא"ל' 
                        required 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                    <input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="סיסמה" 
                        required 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    <button type="button" onClick={toggleShowPassword}>
                        {showPassword ? "הסתר סיסמה" : "הצג סיסמה"}
                    </button>
                    <input 
                        type={showConfirmPassword ? "text" : "password"} 
                        placeholder="אישור סיסמה" 
                        required 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                    />
                    <button type="button" onClick={toggleShowConfirmPassword}>
                        {showConfirmPassword ? "הסתר סיסמה" : "הצג סיסמה"}
                    </button>
                    <button type="submit" disabled={loading}>{loading ? "טוען..." : "הרשמה"}</button>
                </form>
            ) : (
                <button onClick={() => setIsLoggedIn(false)}>התנתקות</button>
            )}
        </div>
    );
};

export default Register;
