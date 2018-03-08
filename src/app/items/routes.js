import { Router } from 'express';

import * as ItemServices from '../../services/items';
import * as validators from './validators';
import { authenticate } from '../../middlewares/authenticate';

let router = Router();

router.get('/', authenticate, (req, res, next) => {
  ItemServices.fetchAll()
    .then(data => res.json(data))
    .catch(err => next(err));
});

router.post('/', authenticate, validators.create, (req, res, next) => {
  let { item } = req.body;
  ItemServices.create(item)
    .then(data => res.json(data))
    .catch(err => next(err));
});

router.put('/:id', authenticate, validators.create, (req, res, next) => {
  let { item } = req.body;
  let id = req.params.id;
  ItemServices.update(id, item)
    .then(data => res.json(data))
    .catch(err => next(err));
});

export default router;
