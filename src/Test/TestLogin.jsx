import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function TestLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();  // Prevent the default form submission behavior
        axios.post('http://localhost:8000/api/login/', {
            username: username,
            password: password
        })
        .then(response => {
            // Handle successful login
            setMessage('Login successful');
            navigate('/dashboard'); // Redirect to the dashboard
        })
        .catch(error => {
            // Handle error
            setMessage('Invalid credentials');
            console.error('Login error:', error);
        });
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default TestLogin;
