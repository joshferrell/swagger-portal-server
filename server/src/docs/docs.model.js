import Sequelize from 'sequelize';
import config from '../config/index';
import { sqlConnection } from '../db/index';

export const DocumentModel = sqlConnection.define('documents', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4()
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true
    },
    filePath: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
});

export const options = {
    sync: () => DocumentModel.sync({ force: config.sequelize.sync.force })
};

const getPlain = apiDocument =>
    (apiDocument ? apiDocument.get({ plain: true }) : null);

export const get = id =>
    DocumentModel.findByPrimary(id)
        .then(apiDocument => getPlain(apiDocument));

export const deleteDocument = id =>
    DocumentModel.findByPrimary(id)
        .then(apiDocument => apiDocument.destroy());

export const createDocument = (title, filePath, description = null) =>
    DocumentModel.create({ title, filePath, description })
        .then(apiDocument => getPlain(apiDocument));

export const updateDocument = (id, key, value) =>
    DocumentModel.update({ [key]: value }, { where: { id } })
        .then(() => get(id));
