import Joi from 'joi';
import Boom from 'boom';

const getPlain = data => (data ? data.get({ plain: true }) : null);

export const createDocumentRoutes = (logger, model) => {
    const getAllDocuments = {
        method: 'GET',
        path: '/docs',
        handler: (request, reply) =>
            model.findAll()
                .then(docs => docs.map(getPlain))
                .then(docs => reply(docs))
                .catch((err) => {
                    logger.error(err, 'Unable to fetch Documents');
                    reply(Boom.internal());
                })
    };

    const createNewDocument = {
        method: 'POST',
        path: '/docs',
        config: {
            validate: {
                payload: {
                    title: Joi.string().required(),
                    description: Joi.string().required(),
                    swaggerFile: Joi.any().required()
                }
            }
        },
        handler: (request, reply) => {
            const { title, description, swaggerFile } = request.payload;
            return model
                .create({ title, description, filePath: swaggerFile })
                .then(d => reply(d))
                .catch((err) => {
                    logger.error(err, `Unable to fetch document: ${request.params.id}`);
                    reply(Boom.internal());
                });
        }
    };

    const getDocumentById = {
        method: 'GET',
        path: '/docs/{id}',
        handler: (request, reply) =>
            model.findByPrimary(request.params.id)
                .then(getPlain)
                .then(d => reply(d))
                .catch((err) => {
                    logger.error(err, `Unable to fetch document: ${request.params.id}`);
                    reply(Boom.internal);
                })
    };

    const patchExistingDocument = {
        method: 'PATCH',
        path: '/docs/{id}',
        config: {
            validate: {
                payload: Joi.object({
                    title: Joi.string(),
                    description: Joi.string(),
                    swaggerFile: Joi.string()
                }).required()
            }
        },
        handler: ({ params, payload }, reply) => {
            const updates = Object
              .keys(payload)
              .map(key => model.updateDocument(params.id, key, payload));
            return Promise.all(updates)
              .then(doc => reply(doc))
              .catch((err) => {
                  logger.error(err, `Unable to update document: ${params.id}`);
                  reply(Boom.internal);
              });
        }
    };

    return [
        getAllDocuments,
        createNewDocument,
        getDocumentById,
        patchExistingDocument
    ];
};
