import mongoose from "mongoose";
import {Environment} from "../environment/environment";

const user = Environment.DB_USER;
const password = Environment.DB_PASSWORD;
const host = Environment.DB_HOST;
const port = Environment.DB_PORT;
const name = Environment.DB_NAME;
const URI = `mongodb://${user}:${password}@${host}:${port}/${name}`;

export function databaseConfiguration() {
  return mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false});
}
