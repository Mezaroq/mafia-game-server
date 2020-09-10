import {engine} from "../utils/engine/mustache-engine.util";
import path from "path";
import express, {Express} from "express";


export function mustacheConfiguration(app: Express) {
  app.engine('mustache', engine);
  app.set('view engine', 'mustache');
  app.set('views', path.join(__dirname, '../views'));
  app.use('/public', express.static('public'));
}
