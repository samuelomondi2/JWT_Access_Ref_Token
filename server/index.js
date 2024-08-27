import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

// Model
import UserModel from './models/User';

const app = express();
app.use(express.json());
app.use(cors());

// connect to database
mongoose.connect('');

// register user
app.post('/register', (req, res) => {
    const {name, email, password} = req.body;
    UserModel.create({name, email, password})
        .then(user => res.json(user))
        .catch(err => res.json(err))
})

app.listen(3001, () => {
    console.log("Server is Running...");
});