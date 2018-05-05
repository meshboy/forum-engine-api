/**
 *created by Meshileya Seun <meshileyaseun@gmail.com/> 4/13/18
 * */
import { generateControllers } from '../../modules/query';
import { Post } from './post.model';

const getAll = (req, res, next) => {
  Post.find({ }).populate('user', {email: 1}).exec()
    .then(docs => res.json({ status: true, data: docs }))
    .catch(error => next(error));
};

export default generateControllers(Post, { getAll });
