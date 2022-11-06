import express, { RequestHandler } from 'express';
import {
  getUsersHandler,
  createUserHandler,
  loginUserHandler,
  getUserHandler,
  updateUserHandler,
  deleteUserHandler,
} from '../../controllers/userController';
import { protect } from '../../middleware/authMiddleware';

const userRoutes = express.Router();

userRoutes
  .route('/')
  .get(protect as RequestHandler, getUsersHandler as RequestHandler)
  .post(createUserHandler as RequestHandler);
userRoutes.route('/login').post(loginUserHandler as RequestHandler);
userRoutes
  .route('/:id')
  .get(getUserHandler as RequestHandler)
  .put(protect as RequestHandler, updateUserHandler as RequestHandler)
  .delete(protect as RequestHandler, deleteUserHandler as RequestHandler);

export default userRoutes;
