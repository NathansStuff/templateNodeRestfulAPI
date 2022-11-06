import bcrypt from 'bcryptjs';

import { checkIsValidObjectId } from '../database/db';
import BadRequestError from '../middleware/Errors/BadRequestError';
import NotFoundError from '../middleware/Errors/NotFoundError';
import UserModel from '../models/userModel';
import { sanitizeLoginUser, sanitizeUser } from '../sanitizers/userSanitizer';
import { IUserSchema } from '../schema/userSchema';
import { UserReturnType, UserType } from '../types/userTypes';
import { generateToken } from './tokenService';

export async function getUsers(): Promise<UserType[]> {
  const users = await UserModel.find({});
  return users;
}

export async function createUser(user: UserType): Promise<UserReturnType> {
  const sanitizedUser = await sanitizeUser(user);
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(sanitizedUser.password, salt);

  const newUser = new UserModel({
    username: sanitizedUser.username,
    email: sanitizedUser.email,
    password: hashedPassword,
    isAdmin: sanitizedUser.isAdmin,
  });

  const createdUser = await newUser.save();

  return returnUser(createdUser);
}

export async function getUserById(userId: string): Promise<IUserSchema> {
  checkIsValidObjectId(userId);
  const user = await UserModel.findById(userId);
  if (user == null) throw new NotFoundError('User not found');
  return user;
}

export async function loginUser(
  email: string,
  password: string
): Promise<UserReturnType> {
  const sanitizedUser = await sanitizeLoginUser(email, password);

  const user = await UserModel.findOne({ email: sanitizedUser.email });
  if (user == null) throw new NotFoundError('User not found');

  const validPassword = await bcrypt.compare(
    sanitizedUser.password,
    user.password
  );

  if (!validPassword) throw new BadRequestError('Invalid password');

  return returnUser(user);
}

export async function updateUser(
  userId: string,
  user: UserType
): Promise<IUserSchema> {
  checkIsValidObjectId(userId);
  const sanitizedUser = sanitizeUser(user);

  const updatedUser = await UserModel.findByIdAndUpdate(userId, sanitizedUser, {
    new: true,
  });
  if (updatedUser == null) throw new NotFoundError('User not found');

  return updatedUser;
}

export async function deleteUser(userId: string): Promise<void> {
  checkIsValidObjectId(userId);
  const user = await UserModel.findByIdAndDelete(userId);
  if (user == null) throw new NotFoundError('User not found');
}

function returnUser(user: IUserSchema): UserReturnType {
  const token = generateUserToken(user);
  return {
    _id: user._id,
    username: user.username,
    email: user.email,
    isAdmin: user.isAdmin,
    token,
  };
}

function generateUserToken(user: IUserSchema): string {
  const token = generateToken({
    _id: user._id,
    username: user.username,
    email: user.email,
    isAdmin: user.isAdmin,
  });

  return token;
}
