import Hapi from 'hapi';
import { dbConnect } from './db/index';
import { DocumentRoutes } from './docs/index';
import { config, log } from './config/index';

const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: config.port
});

server.route([
    ...DocumentRoutes
]);

export const startServer = async () => {
    try {
        const connection = await dbConnect();
        if (connection === false) {
            throw new Error('Unable to connect to database');
        }

        server.start((err) => {
            if (err) {
                throw err;
            }

            log.debug('Server running at:', server.info.uri);
        });
    } catch (err) {
        log.error(err, 'Failed to start server');
    }
};

startServer();

export default startServer;
