/**
 *created by Meshileya Seun <meshileyaseun@gmail.com/> 4/12/18
 * */
import '../src/api/resources/user/user.model';
import '../src/api/resources/post/post.model';
import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

export const removeModel = modelName => {
  const model = mongoose.model(modelName);
  return new Promise((resolve, reject) => {
    if (!model) {
      return resolve();
    }
    model.remove(error => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

export const dropDb = () => mongoose.connect('mongodb://localhost/test-forum-api', { useMongoClient: true })
    .then(() => Promise.all(mongoose.modelNames().map(removeModel)));
