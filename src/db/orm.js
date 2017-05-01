import Sequelize from 'sequelize';
import config from '../config/index';
import * as documentModel from '../docs/docs.model';

const {
    host,
    port,
    dbname,
    user,
    password
} = config.sequelize;

export const sqlConnection = new Sequelize(dbname, user, password, {
    host,
    port,
    dialect: 'postgres'
});

export const init = () => {
    const models = [
        documentModel.options
    ];

    return Promise.all(
        models.map(model => model.sync())
    );
};

export const connect = async () => {
    try {
        await sqlConnection.authenticate();
        await init();
        return true;
    } catch (e) {
        return false;
    }
};
