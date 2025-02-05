import express from 'express';
import helmet from 'helmet';
import routes from './routes/index.js';
import { errorHandler } from './middleware/error.middleware.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();

app.use(express.json({ limit: '100kb' }));

app.use(helmet({
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
      defaultSrc: ["'self'"],
    }
  },
  hsts: { maxAge: 31536000, includeSubDomains: true }
}));

app.use('/api/v1', routes);

app.use(errorHandler);

const port = process.env.PORT || 3456;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export { app };
