import React from 'react';
import './Login.css'; // Import the CSS file

const Login = () => {
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5004/auth/google'; // Redirect to backend route for Google authentication
  };

  return (
    <div className="container"> {/* Add a container class */}
      <button className="button" onClick={handleGoogleLogin}>Sign in with Google</button> {/* Add a button class */}
    </div>
  );
};

export default Login;
