import { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import express from 'express';
import { StudentRoutes } from './modules/student/student.route';
import { UserRoutes } from './modules/user/user.route';
import globalErrorhandler from './middlewares/globalErrorhandler';
import notFound from './middlewares/notFound';

const app = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes

app.use('/api/v1/students', StudentRoutes);
app.use('/api/v1/users', UserRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use(globalErrorhandler);

// Not Found
app.use(notFound);

export default app;
