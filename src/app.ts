import express, { Request, Response } from 'express';
import cors from 'cors';
import { studentRoutes } from './modules/students/student.route';
const app = express();

//parsers

app.use(express.json());
app.use(cors());

// applications routes

app.use('/api/v1/students', studentRoutes);

const getAControllar = (req: Request, res: Response) => {
  res.send('hello world');
};

app.get('/', getAControllar);

export default app;
