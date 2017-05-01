import Sequelize from 'sequelize';
import config from '../config/index';
import { sqlConnection } from '../db/orm';

console.log(sqlConnection);
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
    swaggerUrl: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            isUrl: true
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
