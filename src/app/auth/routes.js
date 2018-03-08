import { Router } from 'express';

import * as AuthServices from '../../services/auth';
import * as validators from './validators';
import { authenticate } from '../../middlewares/authenticate';

let router = Router();

router.post('/login', validators.login, (req, res, next) => {
  const { user } = req.body;

  AuthServices.login(user)
    .then(data => res.json(data))
    .catch(err => next(err));
});

router.post('/refresh', (req, res, next) => {
  const { refreshToken } = req.body;
  AuthServices.refresh(refreshToken)
    .then(data => res.json(data))
    .catch(err => next(err));
});

router.get('/logout', authenticate, (req, res, next) => {
  const { deviceId } = res.locals;
  AuthServices.logout(deviceId)
    .then(data => res.json(data))
    .catch(err => next(err));
});

export default router;
