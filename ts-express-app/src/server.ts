import express, { Request, Response } from 'express';
import tasksRouter from './routes/tasks';
import { connectDB } from './db/mongoose';
import cors from 'cors';


const app = express();
const PORT = process.env.PORT || 3000;



app.use(cors({
  origin: 'http://localhost:3001'
}));

connectDB();

app.use(express.json());

// Root endpoint
app.get('/', (req: Request, res: Response) => {
  res.send('Hello from TypeScript + Express!');
});

// Tasks router
app.use('/api/tasks', tasksRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});