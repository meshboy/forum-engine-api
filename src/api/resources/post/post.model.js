/**
 *created by Meshileya Seun <meshileyaseun@gmail.com/> 4/13/18
 * */
import mongoose from 'mongoose';

export const schema = {
  title: {
    type: String,
    required: [true, 'Title is required'],
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'User is required'],
    ref: 'Users',
  },

  comment: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
      },
      message: {
        type: String,
      },
    },
  ],
};

export const Post = mongoose.model('Posts', new mongoose.Schema(schema, { timestamps: true }));
