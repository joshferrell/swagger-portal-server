import joi from 'joi';
import { format } from '../utility';
import {
    postFormat,
    responseFormat,
    patchFormat,
    makeGetAllDocuments,
    makeCreateDocument,
    makeGetDocument,
    makeUpdateDocument,
    makeDeleteDocument
} from '.';

const createDocRoutes = (model, url) => {
    const handleGetAllDocuments = makeGetAllDocuments(model, url);
    const handleCreateDocument = makeCreateDocument(model, url);
    const handleGetDocument = makeGetDocument(model, url);
    const handleUpdateDocument = makeUpdateDocument(model, url);
    const handleDeleteDocument = makeDeleteDocument(model);

    const getAllDocuments = {
        method: 'GET',
        path: '/docs',
        handler: handleGetAllDocuments,
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
        handler: handleCreateDocument,
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
        handler: handleGetDocument,
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
        handler: handleUpdateDocument,
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
        handler: handleDeleteDocument,
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
