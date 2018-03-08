import { Router } from 'express';

import * as UserServices from '../../services/users';
import * as validators from './validators';

let router = Router();

router.post('/', validators.create, (req, res, next) => {
  const { user } = req.body;

  return UserServices.create(user)
    .then(data => res.json(data))
    .catch(err => next(err));
});

export default router;
