import User from '../models/User';

import UserService from '../services/UserService';

export default class UserController {
  async findAll(): Promise<User[]> {
    const userService = new UserService();
    return userService.findAll();
  }

  async findById(payload: any): Promise<User> {
    const { id } = payload;
    const userService = new UserService();

    return userService.findById(id);
  }

  async create(payload: any): Promise<User> {
    const { name, lastName, email, password } = payload.body;
    const createUser = new UserService();

    const user = await createUser.execute({
      name,
      lastName,
      email,
      password,
    });

    return user;
  }

  async authenticate(payload: any): Promise<User> {
    const { email, password } = payload.body;
    const userService = new UserService();

    const user = await userService.isAuthenticated({
      email,
      password,
    });

    return user;
  }

  async update(payload: any): Promise<User> {
    const { id } = payload.params;
    const { name, lastName, email, password } = payload.body;

    const userService = new UserService();

    const user = userService.update({
      id,
      name,
      lastName,
      email,
      password,
    });

    return user;
  }

  async remove(payload: any): Promise<any> {
    const { id } = payload.params;

    const userService = new UserService();

    return userService.remove(id);
  }
}
