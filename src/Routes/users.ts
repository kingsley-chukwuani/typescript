import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User'; 
import { body, validationResult } from 'express-validator';

const router = express.Router();

router.post(
  '/register',
  [
    body('username').isString(),
    body('password').isLength({ min: 5 })
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { username, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, password: hashedPassword });
      await user.save();
      res.status(201).send({ username });
    } catch (error) {
      res.status(500).send({ error: 'An error occurred while creating the user' });
    }
  }
);

router.post(
  '/login',
  [
    body('username').isString(),
    body('password').isString()
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).send({ error: 'Invalid username or password' });
      }

      const jwtSecret = process.env.JWT_SECRET;
      if (!jwtSecret) {
        throw new Error('JWT Secret not defined');
      }

      const token = jwt.sign({ userId: user._id }, jwtSecret);
      res.send({ token });
    } catch (error) {
      res.status(500).send({ error: 'An error occurred while logging in' });
    }
  }
);

export default router;