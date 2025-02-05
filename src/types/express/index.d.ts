import { UserAuth } from '../../config/types';

declare global {
  namespace Express {
    interface Request {
      user?: UserAuth;
    }
  }
}
