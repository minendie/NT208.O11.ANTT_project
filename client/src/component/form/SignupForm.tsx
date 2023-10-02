// src/components/SignupForm.tsx
import React, { useState } from 'react';
import axios from 'axios';


const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;


const SignupForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const handleSignup = () => {
    // Add your signup logic here
    const data = { username, password, email }
    // fetch
    axios.post(`${API_ENDPOINT}/auth/signup`, data, 
    )
    .then((result) => {
      console.log(result)
      if (result.data.success) {
        alert('Sign up successfully');
      }
      else {
        alert('User exists')
      }
    })
    .catch((err) =>{
      console.log(err)
    })
  };

  const showPassword = () => {
    if (isChecked) {
      setIsChecked(false)
    } 
    else {
      setIsChecked(true)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Welcome to Greendots!</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 border rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            type={isChecked ? "text" : "password"}
            placeholder="Password"
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input type="checkbox" onChange={showPassword} checked={isChecked}/>
        <label htmlFor='showPass' onClick={showPassword}>Show your password</label>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          onClick={handleSignup}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignupForm;
