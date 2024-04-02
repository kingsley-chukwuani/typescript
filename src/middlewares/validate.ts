import Joi, { Schema, ValidationResult } from 'joi';
import { Request, Response, NextFunction } from 'express';

export default function (schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log('req.body:', req.body);
    const { error } = schema.validate(req.body) as ValidationResult;
    if (error) {
      console.log('Validation error:', error);
      return res.status(400).send(error.details[0].message);
    }
    next();
  };
};