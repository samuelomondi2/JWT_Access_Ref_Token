import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

const app = express();

app.listen(3001, () => {
    console.log("Server is Running...");
});