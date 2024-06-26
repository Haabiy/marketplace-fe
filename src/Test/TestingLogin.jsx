import React, {useState} from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function TestingLogin(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const handlelogin=(event)=>{
        event.preventDefault(); 
        axios.post('http://127.0.0.1:8000/api/login/', {
            username: username,
            password: password
          })
          .then(response => {
            navigate('/dashboard'); 
          })
          .catch(error => {
            console.log(error);
          });
    };

      return(
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
            <form className="space-y-4" onSubmit={handlelogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={x=>setUsername(x.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={x=>setPassword(x.target.value)}
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

export default TestingLogin;