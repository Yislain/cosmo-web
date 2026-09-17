import { useState } from 'react';
import RegisterScreen from './components/RegisterScreen';
import { GameScreen } from './components/GameScreen';
import './App.css';
import './index.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState('');

  const handleLoginSuccess = (username: string) => {
    setCurrentUser(username);
    setIsAuthenticated(true);
  };

  return (
    <div>
      {!isAuthenticated ? (
        <RegisterScreen onLoginSuccess={handleLoginSuccess} />
      ) : (
        <GameScreen username={currentUser} onLogout={() => setIsAuthenticated(false)} />
      )}
    </div>
  );
}

export default App;