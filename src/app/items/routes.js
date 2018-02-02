import { Router } from "express";

import { authenticate } from "../../middlewares/authenticate";

let router = Router();

let items = [
  {
    id: 1,
    name: "Desk"
  },
  {
    id: 2,
    name: "Chair"
  }
];

//TODO:
router.get("/", authenticate, (req, res, next) => {
  res.json({ items });
});

export default router;
