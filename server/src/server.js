import { compose } from 'glue';
import { createLogger, stdSerializers } from 'bunyan';
import dotenv from 'dotenv-safe';
import createManifest from './manifest';

import createDocRoutes from './docs';
import createHealthRoutes from './health';

dotenv.load();

const serverInfo = {
    url: process.env.SERVER_URL,
    scheme: process.env.SERVER_SCHEME
};

const log = createLogger({
    name: 'swagger-portal',
    serializers: {
        err: stdSerializers.err
    },
    level: 'trace'
});

const startServer = (server) => {
    const healthRoutes = createHealthRoutes();
    const docRoutes = createDocRoutes();

    server.route(healthRoutes);
    server.route(docRoutes);

    server.start();
    server.log('info', `Server running at ${server.info.uri}`);
};

const failServer = (err) => {
    log.error(err, 'unable to start server');
    process.exit(-1);
};

const manifest = createManifest(process.env.NODE_ENV, serverInfo, log);

compose(manifest).then(startServer, failServer);
