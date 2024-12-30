import express from 'express';
import cors from 'cors';
import  router from './router';
import { connectDB } from './config/db';
import 'dotenv/config';
import { corsConfig } from './config/cors';

connectDB();

const app = express();
// Cors
app.use(cors(corsConfig));

// read form data
app.use(express.json());

app.use('/api', router);

export default app; 
