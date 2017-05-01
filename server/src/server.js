import Hapi from 'hapi';
import { dbConnect } from './db/index';

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
        await dbConnect();

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
