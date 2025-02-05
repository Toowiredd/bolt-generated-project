import express from 'express';
import { body, validationResult } from 'express-validator';
import { authenticate } from '../middleware/auth.middleware.js';
import { ValidationError, ServiceError } from '../errors/custom-errors.js';

const router = express.Router();

router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

router.post(
  '/conversations',
  authenticate,
  body('text').isString().withMessage('Text is required and must be a string.'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new ValidationError('Validation failed: ' + JSON.stringify(errors.array()));
      return next(error);
    }
    res.status(200).json({ message: 'Conversation processed successfully!' });
  }
);

export default router;
