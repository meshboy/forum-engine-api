/**
 *created by Meshileya Seun <meshileyaseun@gmail.com/> 4/12/18
 **/
import express from 'express';
import { connect } from './db';
import { loginUser, createUser, secure } from './api/modules/auth';
import middleware from './middleware';
import { router } from './api/router';

const app = express();

middleware(app);
connect();

app.use('/login', loginUser);
app.use('/register', createUser);
app.use('/api/v1/', secure, router);
export default app;

