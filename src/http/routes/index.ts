import { Router } from 'express';

import userRouter from './user.routes';

const routes = Router();

routes.use('/user', userRouter);
routes.use('/', async (request, response) => {
  return response.json({});
});

export default routes;
