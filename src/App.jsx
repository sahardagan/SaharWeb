import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Nav from './components/Nav/Nav';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Game1 from './pages/Game1';
import './App.css'; // קובץ עיצוב חדש

function App() {
  return (
    <div className="background-container">
      <div className="center-content">
        <GoogleOAuthProvider clientId="1022421007108-4unlh678sj4v6vue8jqfoeqs90q6vhal.apps.googleusercontent.com">
          <Router>
          <Nav />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/game1" element={<Game1 />} /> 
            </Routes>
            
          </Router>
        </GoogleOAuthProvider>
      </div>
    </div>
  );
}

export default App;
