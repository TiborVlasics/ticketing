import request from 'supertest';

import { app } from '../../app';

it('clears the cookie after signing out', async () => {
  const signupResponse = await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(201);

  const cookie = signupResponse.get('Set-Cookie') as string[];

  const response = await request(app)
    .post('/api/users/signout')
    .set('Cookie', cookie)
    .send({})
    .expect(200);
  expect(response.get('Set-Cookie')?.[0]).toEqual(
    'session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly',
  );
});
