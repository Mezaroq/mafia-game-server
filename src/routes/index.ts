import {Router} from "express";
import {AuthRouter} from "./auth.router";

export const routes = Router();

routes.use(AuthRouter);

routes.use((req, res) => {
  res.sendStatus(404);
});
