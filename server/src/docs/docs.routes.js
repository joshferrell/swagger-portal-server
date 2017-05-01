import joi from 'joi';
import Boom from 'boom';
import { log } from '../config/index';
import * as documentService from './docs.service';

const documentRoutes = [
    {
        method: 'GET',
        path: '/docs',
        handler: (request, reply) =>
            documentService.getAllDocuments()
                .then(apiDocuments => reply(apiDocuments))
                .catch((err) => {
                    log.error(err, 'Unable to fetch Documents');
                    reply(Boom.internal());
                })
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
        handler: (request, reply) =>
            documentService.createDocument(request.payload)
                .then(apiDocument => reply(apiDocument))
                .catch((err) => {
                    log.error(err, 'Unable to create new document');
                    reply(Boom.internal());
                })
    },
    {
        method: 'GET',
        path: '/docs/{id}',
        handler: (request, reply) =>
            documentService.getDocument(request.params)
                .then(apiDocument => reply(apiDocument))
                .catch((err) => {
                    log.error(err, `Unable to fetch document: ${request.params.id}`);
                    reply(Boom.internal);
                })
    },
    {
        method: 'PATCH',
        path: '/docs/{id}',
        config: {
            validate: {
                payload: joi.object({
                    title: joi.string(),
                    description: joi.string(),
                    swaggerFile: joi.string()
                }).required()
            }
        },
        handler: ({ params, payload }, reply) =>
            documentService.updateValues(params.id, payload)
                .then(apiDocument => reply(apiDocument))
                .catch((err) => {
                    log.error(err, `Unable to update document: ${params.id}`);
                    reply(Boom.internal);
                })
    }
];

export default documentRoutes;
