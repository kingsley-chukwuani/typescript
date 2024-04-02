import express, { Request, Response } from 'express';
import Room from '../models/Room';
import mongoose from 'mongoose';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const room = new Room(req.body);
    await room.save();
    res.status(201).send(room);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get('/', async (req: Request, res: Response) => {
  try {
    const { search, roomType, minPrice = 0, maxPrice } = req.query;
    const query = Room.find({
      name: new RegExp(search as string, 'i'),
      roomType: new mongoose.Types.ObjectId(roomType as string),
      price: { $gte: minPrice, $lte: maxPrice || Infinity }
    }).populate('roomType');
    const rooms = await query.exec();
    res.send(rooms);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.patch('/:roomId', async (req: Request, res: Response) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.roomId, req.body, { new: true });
    if (!room) {
      return res.status(404).send();
    }
    res.send(room);
  } catch (err) {
    res.status(500).send(err);
  }
});

export default router;