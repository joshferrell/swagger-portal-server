import joi from 'joi';
import Boom from 'boom';

const documentRoutes = [
    {
        method: 'GET',
        path: '/docs',
        handler: (request, reply) => reply(Boom.notImplemented())
    },
    {
        method: 'POST',
        path: '/docs',
        config: {
            validate: {
                payload: {
                    title: joi.string().required(),
                    description: joi.string().required(),
                    swaggerFile: joi.any().required()
                }
            }
        },
        handler: (request, reply) => reply(Boom.notImplemented())
    },
    {
        method: 'GET',
        path: '/docs/{id}',
        handler: (request, reply) => reply(Boom.notImplemented())
    },
    {
        method: 'PATCH',
        path: '/docs/{id}',
        config: {
            validate: {
                payload: joi.any().required().description('requires title, description, or swaggerFile')
            }
        },
        handler: (request, reply) => reply(Boom.notImplemented())
    }
];

export default documentRoutes;
