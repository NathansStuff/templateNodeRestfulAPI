import { checkIsValidObjectId } from '../database/db';
import BadRequestError from '../middleware/Errors/BadRequestError';
import { emailRegex } from '../schema/userSchema';
import { UserSanitizerType, UserType } from '../types/userTypes';

export async function sanitizeUser(
  users: UserType
): Promise<UserSanitizerType> {
  const sanitizedUser: UserSanitizerType = {
    username: '',
    email: '',
    password: '',
    isAdmin: false,
  };

  sanitizedUser.email = sanitizeEmail(users.email);
  sanitizedUser.isAdmin = sanitizeIsAdmin(users.isAdmin);
  sanitizedUser.username = sanitizeUsername(users.username);
  sanitizedUser.password = await sanitizePassword(users.password);

  return sanitizedUser;
}

export async function sanitizeLoginUser(
  email: string,
  password: string
): Promise<UserSanitizerType> {
  const sanitizedUser: UserSanitizerType = {
    username: '',
    email: '',
    password: '',
    isAdmin: false,
  };

  sanitizedUser.email = sanitizeEmail(email);
  sanitizedUser.password = await sanitizePassword(password);

  return sanitizedUser;
}

function sanitizeUsername(username: string): string {
  // Types
  if (username === undefined) {
    throw new BadRequestError('Username is undefined');
  }
  if (typeof username !== 'string') {
    throw new BadRequestError('Username is not a string');
  }

  // Attributes
  username = username.trim();

  return username;
}

function sanitizeIsAdmin(isAdmin: boolean): boolean {
  // Types
  if (!isAdmin) isAdmin = false;

  return isAdmin;
}

function sanitizeEmail(email: string): string {
  // Types
  if (email === undefined) {
    throw new BadRequestError('Email is undefined');
  }
  if (typeof email !== 'string') {
    throw new BadRequestError('Email is not a string');
  }

  // Attributes
  email = email.trim();
  if (email.length < 6) {
    throw new BadRequestError('Email must be at least 6 characters');
  }
  if (email.length > 50) {
    throw new BadRequestError('Email mut be less then 50 characters');
  }
  if (email.match(emailRegex) == null) {
    throw new BadRequestError('Please add a valid email');
  }

  return email;
}

async function sanitizePassword(enteredPassword: string): Promise<string> {
  // Types
  if (enteredPassword === undefined) {
    throw new BadRequestError('Password is undefined');
  }
  if (typeof enteredPassword !== 'string') {
    throw new BadRequestError('Password is not a string');
  }

  // Attributes
  enteredPassword = enteredPassword.trim();
  if (enteredPassword.length < 6) {
    throw new BadRequestError('Password must be at least 6 characters');
  }
  if (enteredPassword.length > 50) {
    throw new BadRequestError('Password mut be less then 50 characters');
  }

  return enteredPassword;
}

export function sanitizeId(id: string | undefined): string {
  if (id === undefined) {
    throw new BadRequestError('UserId is undefined');
  }
  checkIsValidObjectId(id);
  return id.valueOf(); // "ObjectId('idstring')"
}
