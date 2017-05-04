import Boom from 'boom';

export const createHealthRoutes = () => {
    const healthCheck = {
        method: 'GET',
        path: '/healthCheck',
        handler: (request, reply) =>
            reply({ success: 'OK' })
    };

    return [
        healthCheck
    ];
};

export default createHealthRoutes;
