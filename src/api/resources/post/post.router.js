/**
 *created by Meshileya Seun <meshileyaseun@gmail.com/> 4/13/18
 * */
import express from 'express';
import PostController from './post.controller';

const postRouter = express.Router();

postRouter.param('id', postRouter.findByParam);

postRouter.route('/')
  .post(PostController.createOne)
  .get(PostController.getAll);

postRouter.route('/:id')
  .get(PostController.getOne)
  .put(PostController.updateOne)
  .delete(PostController.deleteOne);

export default postRouter;
