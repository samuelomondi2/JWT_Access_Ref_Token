import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = e => {
      e.preventDefault();
      axios.post('http://localhost:3001/login', {email, password})
          .then(res => {
            console.log(res.data)
            // navigate('/login')
          })
          .catch(err => console.log(err))
  }

  return (
    <div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">
                <strong>Email</strong>
            </label>
            <input 
                type="email" 
                placeholder='Enter Email'
                autoComplete='off'
                name='email'
                onChange={e => setEmail(e.target.value)}
            />
            <label htmlFor="email">
                <strong>Password</strong>
            </label>
            <input 
                type="password" 
                placeholder='Enter Password'
                name='password'
                onChange={e => setPassword(e.target.value)}
            />
            <button type='submit'>Login</button>
        </form>
        <p>Don't have an account?</p>
        <button>Register</button>
    </div>
  )
}

export default Login