import { Router } from 'express';
import authRoute from './auth/routes';
import usersRoute from './users/routes';

let router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Application is running' });
});

router.use('/auth', authRoute);
router.use('/users', usersRoute);

export default router;
