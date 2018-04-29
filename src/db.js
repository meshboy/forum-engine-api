/**
 *created by Meshileya Seun <meshileyaseun@gmail.com/> 4/12/18
 **/
import mongoose from 'mongoose';

const dummyUrl = 'mongodb://localhost/forum-api';

export const connect = () => {
  return mongoose.connect(dummyUrl, { useMongoClient: true })
}
