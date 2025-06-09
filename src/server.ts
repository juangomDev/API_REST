import express, { Application, Request, Response } from 'express';
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv';
import router  from './router/router'
import { globalErrorHandler } from './middlewares/globalError';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors())
app.use(morgan('dev'))

// Basic router
app.use('/api/v1/phrases', router)

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'API is running successfully!' });
});

app.use(globalErrorHandler)

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});