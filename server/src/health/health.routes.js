import { format } from '../utility';
import {
    healthStatus,
    makeDependencyStatus,
    makeCheckDatabase
} from '.';

const createHealthRoutes = (model, logger) => {
    const checkPostgres = makeCheckDatabase('Postgres', model, logger);
    const dependencyStatus = makeDependencyStatus([checkPostgres]);

    const checkServer = {
        method: 'GET',
        path: '/healthCheck',
        handler: healthStatus,
        config: {
            auth: false,
            tags: ['api', 'Server Utilities'],
            description: 'Get up status of server',
            notes: [
                'Returns success if the server is online'
            ],
            plugins: {
                'hapi-swagger': {
                    responses: {
                        ...format.healthCheck,
                        ...format.notImplemented
                    }
                }
            }
        }
    };

    const checkDependencies = {
        method: 'GET',
        path: '/healthCheck/all',
        handler: dependencyStatus,
        config: {
            auth: false,
            tags: ['api', 'Server Utilities'],
            description: 'Get up status of server dependencies',
            notes: [
                'Returns an array of each server dependency with up status and latency'
            ],
            plugins: {
                'hapi-swagger': {
                    responses: {
                        ...format.checkDependency,
                        ...format.internalError,
                        ...format.notImplemented
                    }
                }
            }
        }
    };

    return [
        checkServer,
        checkDependencies
    ];
};

export default createHealthRoutes;
