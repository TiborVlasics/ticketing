import Express from 'express';
import { json } from 'body-parser';
import { Mongoose } from 'mongoose';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
// import { signin } from './test/setup';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { signoutRouter } from './routes/signout';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = Express();

app.use(json());
app.set('trust proxy', true);
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  }),
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);

// since express v5 * is not working directly
app.all(/(.*)/, () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
