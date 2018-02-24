import { Router } from 'express';

import * as services from './services';
import * as validators from './validators';
import { authenticate } from '../../middlewares/authenticate';

let router = Router();

router.get('/', authenticate, (req, res, next) => {
  services
    .fetchAll()
    .then(data => res.json(data))
    .catch(err => next(err));
});

router.post('/', validators.create, (req, res, next) => {
  let { item } = req.body;
  services
    .create(item)
    .then(data => res.json(data))
    .catch(err => next(err));
});

export default router;
