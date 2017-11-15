import boom from 'boom';
import { pipe, map } from 'ramda';

export const mapUrl = url => ({ id }) => `${url}/docs/${id}`;

export const makeGetAllDocuments = (docModel, tagModel, url) => (request, reply) =>
    docModel
        .findAll({
            raw: true,
            include: [{
                model: tagModel,
                attributes: [['name', 'tag']]
            }]
        })
        .then(pipe(
            map(mapUrl(url)),
            reply
        ))
        .catch((err) => {
            request.log('error', { err, msg: 'unable to get all documents' });
            return reply(boom.badImplementation());
        });

export const makeCreateDocument = (model, url) => (request, reply) =>
    model
        .create(request.payload, {
            raw: true,
            returning: true
        })
        .then(pipe(
            mapUrl(url),
            reply
        ))
        .catch((err) => {
            request.log('error', { err, msg: 'unable to create document' });
            return reply(boom.badImplementation());
        });

export const makeGetDocument = (model, url) => (request, reply) =>
    model
        .findById(request.params.id, {
            raw: true
        })
        .then(pipe(
            mapUrl(url),
            reply
        ))
        .catch((err) => {
            request.log('error', { err, msg: 'unable to get document' });
            return reply(boom.badImplementation());
        });

export const makeUpdateDocument = (model, url) => (request, reply) =>
    model
        .update(request.payload, {
            returning: true,
            where: { id: request.params.id }
        })
        .then(pipe(
            mapUrl(url),
            reply
        ))
        .catch((err) => {
            request.log('error', { err, msg: 'unable to update document' });
            return reply(boom.badImplementation());
        });

export const makeDeleteDocument = model => (request, reply) =>
    model
        .destroy({
            where: { id: request.params.id }
        })
        .then(() => reply({ success: true }))
        .catch((err) => {
            request.log('error', { err, msg: 'unable to update document' });
            return reply(boom.badImplementation());
        });
