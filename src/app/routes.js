import { Router } from 'express';
import authRoute from './auth/routes';
import usersRoute from './users/routes';
import itemsRoute from './items/routes';

let router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Application is running' });
});

router.use('/auth', authRoute);
router.use('/users', usersRoute);
router.use('/items', itemsRoute);

export default router;
