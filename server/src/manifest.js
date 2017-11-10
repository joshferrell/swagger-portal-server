import {
    createLocalPlugins,
    createDevPlugins,
    createProdPlugins
} from './plugins';
import { packageData } from './utility';

/**
 * creates a server manifest that describes active server information for glue
 * @param  {string} environment one of local, development, or production
 * @param  {object} serverInfo  { scheme, url }
 * @param  {function} logger    a bunyan logger
 * @return {object}             server manifest
 */
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
