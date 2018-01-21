import { Router } from 'express';
import authRoute from './auth/routes';

let router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Application is running' });
});

router.use('/auth', authRoute);

export default router;
