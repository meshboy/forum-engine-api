/**
 *created by Meshileya Seun <meshileyaseun@gmail.com/> 4/13/18
 * */
import express from 'express';
import UserController from './user.controller';

export const UserRouter = express.Router();

UserRouter.param('id', UserController.findByParam);

UserRouter.route('/')
  .get(UserController.getAll)
  .post(UserController.createOne);

UserRouter.route('/:id')
  .get(UserController.getOne)
  .update(UserController.updateOne);
