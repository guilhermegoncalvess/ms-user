import { hash, compare } from 'bcryptjs';
import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';

import User from '../models/User';

interface Request {
  name?: string;
  lastName?: string;
  email: string;
  password: string;
}

class UserService {
  public async execute({
    name,
    lastName,
    email,
    password,
  }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const checkUserExists = await userRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      lastName,
      email,
      password: hashedPassword,
    });

    await userRepository.save(user);

    return user;
  }

  public async isAuthenticated({
    email,
    password,
  }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({
      where: { email },
    });

    if(!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordMatched = await compare(password, user.password);

    if(!passwordMatched){
      throw new AppError('Incorrect email/password combination.', 401);
    }

    return user;
  }
}

export default UserService;
