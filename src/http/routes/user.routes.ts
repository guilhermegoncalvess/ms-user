import { Router } from 'express';

import UserController from '../../controllers/UserController';

const userRouter = Router();

userRouter.get('/', async (request, response) => {
  const userController = new UserController();

  const users = await userController.findAll();

  return response.json(users);
});

userRouter.get('/:id', async (request, response) => {
  const userController = new UserController();

  const user = await userController.findById(request);

  return response.json(user);
});

userRouter.post('/', async (request, response) => {
  const userController = new UserController();

  const user = await userController.create(request);

  return response.json(user);
});

userRouter.post('/login', async (request, response) => {
  const userController = new UserController();

  const user = await userController.authenticate(request);

  return response.json(user);
});

userRouter.put('/:id', async (request, response) => {
  const userController = new UserController();

  const user = await userController.update(request);

  return response.json(user);
});

userRouter.delete('/:id', async (request, response) => {
  const userController = new UserController();

  const message = await userController.remove(request);

  return response.json(message);
});

export default userRouter;
