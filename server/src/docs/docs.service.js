import * as documentModel from './docs.model';

export const createDocument = ({ title, swaggerFile, description }) =>
    documentModel.createDocument(title, swaggerFile, description);

export const updateDocument = (id, key, value) =>
    documentModel.updateDocument(id, key, value);

export const updateValues = (id, payload) =>
    Promise.all(
        Object
            .keys(payload)
            .map(key => updateDocument(id, key, payload[key]))
    );

export const getDocument = ({ id }) =>
    documentModel.get(id);

export const getAllDocuments = () =>
    documentModel.getAll();
