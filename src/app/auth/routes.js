import { Router } from "express";
import * as services from "./services";
import * as validators from "./validators";

let router = Router();

router.post("/login", validators.login, (req, res, next) => {
  services
    .login(req.body)
    .then(data => res.json(data))
    .catch(err => next(err));
});

//TODO:
router.post("/refresh", (req, res, next) => {
  services
    .refresh(req.body)
    .then(data => res.json(data))
    .catch(err => next(err));
});

//TODO:
router.get("/logout", (req, res, next) => {
  res.json({ message: services.logout() });
});

export default router;
