import boom from 'boom';
import joi from 'joi';
import { format } from '../utility';
import { postFormat, responseFormat, patchFormat } from '.';

const createDocRoutes = () => {
    const notImplemented = (request, reply) => reply(boom.notImplemented());

    return [
        {
            method: 'GET',
            route: '/doc',
            handler: notImplemented,
            config: {
                tags: ['api', 'Documentation'],
                plugins: {
                    'hapi-swagger': {
                        200: joi.array().items(responseFormat),
                        ...format.internalError,
                        ...format.notImplemented
                    }
                }
            }
        },
        {
            method: 'POST',
            route: '/doc',
            handler: notImplemented,
            config: {
                validate: { payload: postFormat },
                tags: ['api', 'Documentation'],
                plugins: {
                    'hapi-swagger': {
                        201: {
                            description: 'Creation Successful',
                            schema: responseFormat
                        },
                        ...format.badRequest,
                        ...format.unauthorized,
                        ...format.internalError,
                        ...format.notImplemented
                    }
                }
            }
        },
        {
            method: 'GET',
            route: '/doc/{id}',
            handler: notImplemented,
            config: {
                validate: {
                    params: {
                        id: joi.string().uuid(['uuidv4']).required()
                    }
                },
                tags: ['api', 'Documentation'],
                plugins: {
                    'hapi-swagger': {
                        200: {
                            description: 'Reply Documentation',
                            schema: responseFormat
                        },
                        ...format.notFound,
                        ...format.internalError,
                        ...format.notImplemented
                    }
                }
            }
        },
        {
            method: 'PATCH',
            route: '/doc/{id}',
            handler: notImplemented,
            config: {
                validate: {
                    payload: patchFormat,
                    params: {
                        id: joi.string().uuid(['uuidv4']).required()
                    }
                },
                tags: ['api', 'Documentation'],
                plugins: {
                    'hapi-swagger': {
                        200: {
                            description: 'Reply Updated Data',
                            schema: responseFormat
                        },
                        ...format.notFound,
                        ...format.badRequest,
                        ...format.unauthorized,
                        ...format.internalError,
                        ...format.notImplemented
                    }
                }
            }
        },
        {
            method: 'DELETE',
            route: '/doc/{id}',
            handler: notImplemented,
            config: {
                validate: {
                    params: {
                        id: joi.string().uuid(['uuidv4']).required()
                    }
                },
                tags: ['api', 'Documentation'],
                plugins: {
                    'hapi-swagger': {
                        ...format.success,
                        ...format.notFound,
                        ...format.unauthorized,
                        ...format.internalError,
                        ...format.notImplemented
                    }
                }
            }
        }
    ];
};

export default createDocRoutes;
