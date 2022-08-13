import { hash } from 'bcryptjs';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import AppError from '../errors/AppError';

import User from '../models/User';

interface CreateuserDTO {
  id?: string;
  name?: string;
  lastName?: string;
  email: string;
  password: string;
}

@EntityRepository(User)
class UserRepository extends Repository<User> {
  public async findAll(): Promise<User[]> {
    const userRepository = getRepository(User);

    const users = await userRepository.find({
      select: ['id', 'name', 'lastName', 'email', 'password'],
    });

    if (!users) {
      throw new AppError('Users not found.', 404);
    }

    return users;
  }

  public async findById(id: string): Promise<User> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({
      select: ['id', 'name', 'lastName', 'email', 'password'],
      where: { id },
    });

    if (!user) {
      throw new AppError('user does not exist.', 404);
    }

    return user;
  }

  public async alter({
    id,
    name,
    lastName,
    email,
    password,
  }: CreateuserDTO): Promise<User> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ id });

    if (!user) {
      throw new AppError('user does not exist.', 404);
    }

    const checkUserExists = await userRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await hash(password, 8);

    if (name) user.name = name;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;
    if (password) user.password = hashedPassword;

    await userRepository.save(user);

    return user;
  }

  public async deleteUser(id: string): Promise<void> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(id);

    if (!user) {
      throw new AppError('user does not exist.', 404);
    }

    await usersRepository.remove(user);
  }
}

export default UserRepository;
