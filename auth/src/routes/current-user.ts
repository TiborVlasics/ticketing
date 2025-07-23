import { currentUser } from '@vt_ticketing/common';
import express, { Request, Response } from 'express';

const router = express.Router();

router.get(
  '/api/users/currentuser',
  currentUser,
  (req: Request, res: Response): void => {
    res.send({ currentUser: req.currentUser || null });
  },
);

export { router as currentUserRouter };
