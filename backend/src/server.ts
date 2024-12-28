import express from 'express';
import  router from './router';
import { connectDB } from './config/db';
import 'dotenv/config';

const app = express();

connectDB();
// read form data
app.use(express.json());

app.use('/api', router);

export default app; 
