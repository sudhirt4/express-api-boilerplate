import { Router } from 'express';

import * as TagsServices from '../../services/tags';

import * as validators from './validators';
import { authenticate } from '../../middlewares/authenticate';

let router = Router();

router.get('/', authenticate, (req, res, next) => {
  TagsServices.fetchAll()
    .then(data => res.json(data))
    .catch(err => next(err));
});

router.post('/', authenticate, validators.create, (req, res, next) => {
  let { tag } = req.body;
  TagsServices.create(tag)
    .then(data => res.json(data))
    .catch(err => next(err));
});

router.put('/:id', authenticate, validators.create, (req, res, next) => {
  let { tag } = req.body;
  let id = req.params.id;
  TagsServices.update(id, tag)
    .then(data => res.json(data))
    .catch(err => next(err));
});

export default router;
