import Hapi from 'hapi';
import { dbConnect } from './db/index';
import config from './config/index';

const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: config.port
});

server.route({
    method: 'GET',
    path: '/hello',
    handler: (request, reply) => reply('hello world')
});

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

            console.log('Server running at:', server.info.uri);
        });
    } catch (e) {
        console.log(err, 'Failed to start server');
    }
};

startServer();

export default startServer;
