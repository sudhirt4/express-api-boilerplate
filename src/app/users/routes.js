import { Router } from "express";

import * as services from "./services";
import * as validators from "./validators";

let router = Router();

router.post("/", validators.create, (req, res, next) => {
  return services
    .create(req.body)
    .then(data => res.json(data))
    .catch(err => next(err));
});

export default router;
