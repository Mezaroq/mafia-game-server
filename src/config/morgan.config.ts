import morgan from "morgan";
import {Express} from "express";

export function morganConfiguration(app: Express) {
  app.use(morgan('tiny'));
}
