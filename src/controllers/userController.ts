import { Response, Request } from 'express';

import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  loginUser,
  updateUser,
} from '../services/userService';

// @desc Get all User
// @route GET /api/User
// @access Public
export async function getUsersHandler(
  req: Request,
  res: Response
): Promise<Response> {
  const Users = await getUsers();
  return res.status(200).json(Users);
}

// @desc Create a new User
// @route POST /api/User
// @access Public
export async function createUserHandler(
  req: Request,
  res: Response
): Promise<void> {
  const createdUser = await createUser(req.body);
  res.status(201).json(createdUser);
}

// @desc Login a User
// @route POST /api/User/login
// @access Public
export async function loginUserHandler(
  req: Request,
  res: Response
): Promise<void> {
  const { email, password } = req.body;
  const token = await loginUser(email, password);
  res.status(200).json(token);
}

// @desc Get a User by id
// @route GET /api/User/:id
// @access Public
export async function getUserHandler(
  req: Request,
  res: Response
): Promise<Response> {
  const User = await getUserById(req.params.id);
  return res.status(200).json(User);
}

// @desc Delete a User by id
// @route DELETE /api/User/:id
// @access Private
export async function deleteUserHandler(
  req: Request,
  res: Response
): Promise<Response> {
  const deletedUser = await deleteUser(req.params.id);
  return res.status(200).json(deletedUser);
}

// @desc Update a User by id
// @route PUT /api/User/:id
// @access Private
export async function updateUserHandler(
  req: Request,
  res: Response
): Promise<Response> {
  const updatedUser = await updateUser(req.params.id, req.body);
  return res.status(200).json(updatedUser);
}
