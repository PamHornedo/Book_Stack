import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
import bookRoutes from './routes/book';
import reviewRoutes from './routes/review';
import usersRoutes from './routes/users';
// Import models to establish associations
import './models/Index';

export const createApp = () => {
  const app = express();

  app.use(
    cors({
      origin: ['http://localhost:5173', 'http://localhost:5174'],
      credentials: true
    })
  );
  app.use(express.json());

  app.use('/api/auth', authRoutes);
  app.use('/api/books', bookRoutes);
  app.use('/api', reviewRoutes);
  app.use('/api/users', usersRoutes);

  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Book Stack API is running!' });
  });

  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
  });

  return app;
};

const app = createApp();

export default app;
