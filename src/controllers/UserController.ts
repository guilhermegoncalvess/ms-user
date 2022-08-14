import { getCustomRepository } from 'typeorm';
import User from '../models/User';

import CreateUserService from '../services/CreateUserService';
import UserRepository from '../repositories/UserRepository';

export default class UserController {
  async findAll(): Promise<User[]> {
    const userRepository = getCustomRepository(UserRepository);

    const users = await userRepository.find();

    return users;
  }

  async findById(payload: any): Promise<User> {
    const { id } = payload.params;
    const userRepository = getCustomRepository(UserRepository);

    const users = await userRepository.findById(id);

    return users;
  }

  async create(payload: any): Promise<User> {
    const { name, lastName, email, password } = payload.body;
    const createUser = new CreateUserService();

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
    const createUser = new CreateUserService();

    const user = await createUser.isAuthenticated({
      email,
      password,
    });

    return user;
  }

  async update(payload: any): Promise<User> {
    const { id } = payload.params;
    const { name, lastName, email, password } = payload.body;

    const userRepository = new UserRepository();

    const user = await userRepository.alter({
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

    const userRepository = new UserRepository();

    await userRepository.deleteUser(id);

    return { status: 'Usuário exluído com sucesso!' };
  }
}
