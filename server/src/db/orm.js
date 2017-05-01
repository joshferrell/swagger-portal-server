import { sqlConnection } from './index';
import * as documentModel from '../docs/docs.model';

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
