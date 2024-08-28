import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();

// Model
import UserModel from './models/User.js';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true
}));

// connect to database
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Connected to the database"))
    .catch(() => console.log("Could not connect to the database"))

// register user
app.post('/register', (req, res) => {
    const {name, email, password} = req.body;
    UserModel.create({name, email, password})
        .then(user => res.json(user))
        .catch(err => res.json(err))
});

// login user
app.post('/login', (req, res) => {
    const {email, password} = req.body;
    UserModel.findOne({email})
        .then(user => {
            if(user) {
                if(user.password === password) {
                    // put in terminal to generate random secret key -> node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
                    const accessToken = jwt.sign({email}, process.env.ACCESS_TOKEN_SECRET_KEY, {expiresIn: '1m'});
                    const refreshToken = jwt.sign({email}, process.env.REFRESH_TOKEN_SECRET_KEY, {expiresIn: '5m'});

                    // store in cookie. maxAge is in ms
                    res.cookie('accessToken', accessToken, {maxAge: 60000});

                    // TODO: store in database
                    res.cookie('refreshToken', refreshToken, {maxAge: 300000, httpOnly: true, secure: true, sameSite: 'strict'});

                    return res.json({Login: true});
                }
            } else {
                res.json({Login: false, Message: 'User not found'})
            }
        })
        .catch(err => res.json(err))
});

const verifyUser = (req, res, next) => {
    const accesstoken = req.cookies.accessToken;
    if(!accesstoken) {
        if(renewToken(req, res)) {
            next(); // execute dashboard - return res.json({valid: true, message: 'authorized'});
        }
    } else {
        jwt.verify(accesstoken, process.env.ACCESS_TOKEN_SECRET_KEY, (err, decode) => {
            if(err) {
                return res.json({valid: false, message: 'Invalid Token'})
            } else {
                req.email = decode.email; // the payload (decode.email) we stored
                next(); 
            }
        });
    }
};

const renewToken = (req, res) => {
    const refreshtoken = req.cookies.refreshToken;
    let exist = false;
    if(!refreshtoken) {
        return res.json({valid: false, message: 'No Refresh Token'});
    } else {
        jwt.verify(refreshtoken, process.env.REFRESH_TOKEN_SECRET_KEY, (err, decode) => {
            if(err) {
                return res.json({valid: false, message: 'Invalid Refresh Token'})
            } else {
                const accessToken = jwt.sign({email: decode.email}, process.env.ACCESS_TOKEN_SECRET_KEY, {expiresIn: '1m'});
                res.cookie('accessToken', accessToken, {maxAge: 60000});
                exist = true;
            }
        });
    }
    return exist;
};

app.get('/dashboard', verifyUser, (req, res) => {
    return res.json({valid: true, message: 'authorized'});
});

app.listen(3001, () => {
    console.log("Server is Running...");
});