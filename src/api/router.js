/**
 *created by Meshileya Seun <meshileyaseun@gmail.com/> 4/12/18
 * */
import express from 'express';
import { postRouter } from './resources/post';
import { errorHandler } from './modules/errorHandler';

export const router = express.Router();
router.use('/post', postRouter);
router.use(errorHandler);
