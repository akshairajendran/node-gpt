import React, { useState } from 'react';
import './AuthPage.css'; // Import CSS file for styling

const AuthPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Implement your authentication logic here
    // For simplicity, let's assume login is successful
    onLogin();
  };

  return (
    <div className="auth-container"> {/* Apply class for styling */}
      <h2 className="auth-header">Login</h2> {/* Apply class for styling */}
      <div className="auth-form"> {/* Apply class for styling */}
        <input type="text" className="auth-input" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" className="auth-input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="auth-button" onClick={handleLogin}>Login</button> {/* Apply class for styling */}
      </div>
    </div>
  );
};

export default AuthPage;

