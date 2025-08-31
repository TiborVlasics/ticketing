import request from 'supertest';
import mongoose from 'mongoose';

import { app } from '../../app';

const createTicket = async () => {
  const title = 'test';
  const price = 20;
  return request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({ title, price })
    .expect(201);
};

it('can fetch a list of tickets', async () => {
  //   const id = new mongoose.Types.ObjectId().toHexString();
  await createTicket();
  await createTicket();
  await createTicket();

  const response = await request(app).get(`/api/tickets`).send();
  expect(response.body.length).toEqual(3);
});

// it('returns the ticket if the ticket is found', async () => {
//   const title = 'test';
//   const price = 20;
//   const response = await request(app)
//     .post('/api/tickets')
//     .set('Cookie', global.signin())
//     .send({ title, price })
//     .expect(201);

//   const ticketResponse = await request(app)
//     .get(`/api/tickets/${response.body.id}`)
//     .set('Cookie', global.signin())
//     .send()
//     .expect(200);

//   expect(ticketResponse.body.title).toEqual(title);
//   expect(ticketResponse.body.price).toEqual(price);
// });
