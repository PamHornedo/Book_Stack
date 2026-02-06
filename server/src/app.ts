import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
import questionRoutes from './routes/questions';
import answerRoutes from './routes/answers';
import voteRoutes from './routes/users';

export const createApp = () => {
  const app = express();

  app.use(
    cors({
      origin: 'http://localhost:5173',
      credentials: true
    })
  );
  app.use(express.json());

  app.use('/api/auth', authRoutes);
  app.use('/api/questions', questionRoutes);
  app.use('/api', answerRoutes);
  app.use('/api', voteRoutes);

  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'DevQ&A API is running!' });
  });

  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
  });

  return app;
};

const app = createApp();

export default app;
