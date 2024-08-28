import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate, Link} from 'react-router-dom';

const Registration = () => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();
        axios.post('http://localhost:3001/register', {name, email, password})
            .then(res => navigate('/login'))
            .catch(err => console.log(err))
    }

  return (
    <div>
        <h2>Registration</h2>
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">
                <strong>Name</strong>
            </label>
            <input 
                type="text" 
                placeholder='Enter Name'
                autoComplete='off'
                name='email'
                onChange={e => setName(e.target.value)}
            />
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
            <button type='submit'>Register</button>
        </form>
        <p>Already have an account</p>
        <Link to='/login'>Login</Link>
    </div>
  )
}

export default Registration