import 'reflect-metadata';
import 'dotenv/config';

import express, {
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from 'express';
import 'express-async-errors';
import cors from 'cors';

import bodyParser from 'body-parser';
import routes from './http/routes';
import AppError from './errors/AppError';
import createConnection from './database';
import grpcServer from './http/grpc';

createConnection();
const app = express();

app.use(cors());
app.use(bodyParser.json() as RequestHandler);
app.use(routes);

grpcServer();
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

export default app;
