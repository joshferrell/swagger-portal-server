import {
    createLocalPlugins,
    createDevPlugins,
    createProdPlugins
} from './plugins';
import { packageData } from './utility';

const createManifest = (environment, serverInfo, logger) => {
    const localPlugins = ['local'].includes(environment) ? createLocalPlugins() : [];
    const developmentPlugins = ['development', 'local'].includes(environment) ? createDevPlugins(serverInfo, packageData) : [];
    const productionPlugins = createProdPlugins(logger);

    return ({
        connections: [
            {
                port: 3000,
                labels: ['api'],
                router: {
                    stripTrailingSlash: true
                },
                routes: {
                    cors: true
                }
            },
            {
                port: 3001,
                labels: ['interface']
            }
        ],
        registrations: [
            ...productionPlugins,
            ...developmentPlugins,
            ...localPlugins
        ]
    });
};

export default createManifest;
