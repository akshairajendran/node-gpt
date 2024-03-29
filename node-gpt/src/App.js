// src/App.js
import React, { useState } from 'react';
import AuthPage from './components/AuthPage';
import Terminal from './components/Terminal';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  return (
    <div>
      {!loggedIn ? (
        <AuthPage onLogin={handleLogin} />
      ) : (
        <Terminal />
      )}
    </div>
  );
};

export default App;

