import { Router } from 'express';
import * as authServices from './services';
import * as authValidators from './validators';

let router = Router();

router.post('/login', authValidators.login, (req, res, next) => {
  const { user } = req.body;

  authServices
    .login(user)
    .then(data => res.json(data))
    .catch(err => next(err));
});

router.get('/logout', (req, res, next) => {
  res.json({ message: authServices.logout() });
});

export default router;
