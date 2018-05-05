/**
 *created by Meshileya Seun <meshileyaseun@gmail.com/> 4/13/18
 * */
import Joi from 'joi';
import { generateControllers } from '../../modules/query';
import { Post } from './post.model';

const getAll = (req, res, next) => {
  Post.find({}).populate('user comment.user', { email: 1 }).exec()
    .then(docs => res.status(200).json({ status: true, data: docs }))
    .catch(error => next(error));
};

const updateOne = (req, res, next) => {
  const message = req.body.message;
  const doc = req.docFromId;
  const user = req.body.user;

  const schema = Joi.object().keys({
    message: Joi.string().required(),
  });

  const result = Joi.validate({ message }, schema);

  if (result.error) {
    res.status(400).json({ status: false, message: result.error });
  } else {
    const commentObject = {
      user,
      message,
    };

    Post.findByIdAndUpdate(doc._id, { $push: { comment: commentObject } }, { new: true })
      .exec()
      .then(doc => {
        res.status(200).json({ status: true, data: doc });
      })
      .catch(error => next(error));
  }
};

export default generateControllers(Post, { getAll, updateOne });
