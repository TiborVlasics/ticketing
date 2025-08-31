import {
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
  validateRequest,
} from '@vt_ticketing/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';

import { Ticket } from '../models/ticket';

const router = express.Router();

router.put(
  '/api/tickets/:id',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be greater than zero'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      throw new NotFoundError();
    }

    if (ticket.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }
    ticket.set({
      title,
      price,
    });

    await ticket.save();

    res.status(200).send(ticket.toJSON());
  },
);

export { router as updateTicketRouter };
