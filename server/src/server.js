import Hapi from 'hapi';

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

server.start((err) => {
    if (err) {
        throw err;
    }

    console.log('Server running at:', server.info.uri);
});
