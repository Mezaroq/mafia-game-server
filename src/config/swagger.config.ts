import swaggerUi from "swagger-ui-express";
import {Express} from "express";

const swaggerDocs = require('./swagger.json');

export function swaggerConfiguration(app: Express) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
}
