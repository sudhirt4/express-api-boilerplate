import { Router } from 'express';

import * as services from './services';
import * as validators from './validators';
import { authenticate } from '../../middlewares/authenticate';

let router = Router();

router.post('/login', validators.login, (req, res, next) => {
  const { user } = req.body;

  services
    .login(user)
    .then(data => res.json(data))
    .catch(err => next(err));
});

router.post('/refresh', (req, res, next) => {
  const { refreshToken } = req.body;
  services
    .refresh(refreshToken)
    .then(data => res.json(data))
    .catch(err => next(err));
});

router.get('/logout', authenticate, (req, res, next) => {
  const { deviceId } = res.locals;
  services
    .logout(deviceId)
    .then(data => res.json(data))
    .catch(err => next(err));
});

export default router;
