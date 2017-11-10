import boom from 'boom';
import joi from 'joi';
import { format } from '../utility';
import { postFormat, responseFormat, patchFormat } from '.';

const createDocRoutes = () => {
    const notImplemented = (request, reply) => reply(boom.notImplemented());

    const getAllDocuments = {
        method: 'GET',
        path: '/docs',
        handler: notImplemented,
        config: {
            tags: ['api', 'Documentation'],
            plugins: {
                'hapi-swagger': {
                    responses: {
                        200: {
                            descripton: 'Found Documentation items',
                            schema: joi.array().items(responseFormat)
                        },
                        ...format.internalError,
                        ...format.notImplemented
                    }
                }
            }
        }
    };

    const createNewDocument = {
        method: 'POST',
        path: '/docs',
        handler: notImplemented,
        config: {
            validate: { payload: postFormat },
            tags: ['api', 'Documentation'],
            plugins: {
                'hapi-swagger': {
                    reponses: {
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
        }
    };

    const getDocument = {
        method: 'GET',
        path: '/docs/{id}',
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
                    responses: {
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
        }
    };

    const updateDocument = {
        method: 'PATCH',
        path: '/docs/{id}',
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
                    responses: {
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
        }
    };

    const deleteDocument = {
        method: 'DELETE',
        path: '/docs/{id}',
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
                    responses: {
                        ...format.success,
                        ...format.notFound,
                        ...format.unauthorized,
                        ...format.internalError,
                        ...format.notImplemented
                    }
                }
            }
        }
    };

    return [
        getAllDocuments,
        createNewDocument,
        getDocument,
        updateDocument,
        deleteDocument
    ];
};

export default createDocRoutes;
