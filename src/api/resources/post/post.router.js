/**
 *created by Meshileya Seun <meshileyaseun@gmail.com/> 4/13/18
 * */
import express from 'express';
import PostController from './post.controller';

export const postRouter = express.Router();

postRouter.param('id', PostController.findByParam);

postRouter.route('/')
  .get(PostController.getAll)
  .post(PostController.createOne);

postRouter.route('/:id')
  .get(PostController.getOne)
  .put(PostController.updateOne)
  .delete(PostController.deleteOne);
