import { Request, Response } from 'express';
import cors from 'cors';
import express from 'express';
import globalErrorhandler from './middlewares/globalErrorhandler';
import notFound from './middlewares/notFound';
import router from './routes';
import cookieParser  from 'cookie-parser';

const app = express();

// parsers
app.use(express.json());
app.use(cookieParser())
app.use(cors({origin: ['http://localhost:5170']}));

// application routes

app.use('/api/v1', router);

// const test = async(req: Request, res: Response) => {
//   Promise.reject();
// }

// app.get('/', test);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use(globalErrorhandler);

// Not Found
app.use(notFound);

export default app;
