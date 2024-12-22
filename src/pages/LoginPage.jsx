import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Here you would typically validate the user credentials
        console.log("Logging in user..."); // Log the login attempt
        setIsLoggedIn(true); // Set the user as logged in
        console.log("User logged in successfully."); // Log successful login
        navigate('/'); // Redirect to home page after login
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" required />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" required />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;
