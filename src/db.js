/**
 *created by Meshileya Seun <meshileyaseun@gmail.com/> 4/12/18
 * */
import mongoose from 'mongoose';
import config from './config';

export const connect = () => mongoose.connect(config.db.url, { useMongoClient: true });
