import Hapi from 'hapi';
import DotEnv from 'dotenv-safe';

import { createLogger } from './logger';
import { createConnection } from './orm';
import { createDocumentRoutes } from './docs/docs.routes';
import * as DocumentModel from './docs/docs.model';

DotEnv.load();

const logger = createLogger(process.env.SERVER_NAME);
const sequelize = createConnection();
const documentModel = DocumentModel.create(sequelize);
const documentRoutes = createDocumentRoutes(logger, documentModel);

const startServer = () => {
    const server = new Hapi.Server();
    server.connection({ port: process.env.SERVER_PORT });
    server.route(documentRoutes);
    server.start();
    logger.info(
      `server started @ http://${server.info.host}:${server.info.port}`);
};

const failServer = err => logger.error(err);

documentModel.sync().then(startServer, failServer);
