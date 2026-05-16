import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/AuthRoutes';
import userRoutes from './routes/UserRoutes';
import projectRoutes from './routes/ProjectRoutes';
import assignmentRoutes from './routes/AssignmentRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.set('etag', false);
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store');
  next();
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/assignments', assignmentRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;