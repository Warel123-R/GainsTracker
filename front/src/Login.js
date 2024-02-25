import React from 'react';
import './login_style.css'; // Import the CSS file

const Login = () => {
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5004/auth/google'; // Redirect to backend route for Google authentication
  };

  return (
    <div style={{ backgroundColor: '#4CAF50', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', color: '#fff' }}>
        <h1>NutriHub</h1>
        <button onClick = {handleGoogleLogin} style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#fff', borderRadius: '5px', cursor: 'pointer', border: 'none' }}>Login</button>
      </div>
    </div>
  );
};

export default Login;
