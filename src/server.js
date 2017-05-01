import Hapi from 'hapi';
import { connect } from './db/orm';

const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 8000
});

server.route({
    method: 'GET',
    path: '/hello',
    handler: (request, reply) => reply('hello world')
});

export const startServer = async () => {
    try {
        await connect();

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
