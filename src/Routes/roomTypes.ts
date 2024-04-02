import express, { Request, Response } from 'express';
import RoomType from '../models/RoomType';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const roomType = new RoomType(req.body);
  await roomType.save();
  res.status(201).send(roomType);
});

router.get('/', async (req: Request, res: Response) => {
  const roomTypes = await RoomType.find();
  res.send(roomTypes);
});

export default router;