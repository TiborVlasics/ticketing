import Express from 'express';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError } from '@vt_ticketing/common';



const app = Express();

app.use(json());
app.set('trust proxy', true);
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  }),
);



// since express v5 * is not working directly
app.all(/(.*)/, () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
