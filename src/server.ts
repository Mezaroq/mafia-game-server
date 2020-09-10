import express from "express";
import {databaseConfiguration} from "./config/database.config";
import {Environment} from "./environment/environment";
import {Strings} from "./message/strings";
import {routes} from "./routes";
import {middleware} from "./middlewares";
import {mustacheConfiguration} from "./config/mustache.config";
import {morganConfiguration} from "./config/morgan.config";
import {swaggerConfiguration} from "./config/swagger.config";

const PORT = Environment.APP_PORT;
const app = express();

async function main() {
  await databaseConfiguration();
  mustacheConfiguration(app);
  morganConfiguration(app);
  swaggerConfiguration(app);
  app.get('/', (req, res) => res.redirect(301, '/api-docs'));
  app.use(middleware);
  app.use(routes);
  app.listen(PORT, () => console.log(`${Strings.app_start} ${+PORT}`));
}

main().catch(reason => console.log(`${Strings.app_error} ${reason}`));
