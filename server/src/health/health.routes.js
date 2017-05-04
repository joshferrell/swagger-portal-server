
export const createHealthRoutes = (logger, model) => {
    const healthCheck = {
        method: 'GET',
        path: '/healthCheck',
        handler: (request, reply) =>
            reply({ success: 'OK' })
    };

    const healthCheckAll = {
        method: 'GET',
        path: '/healthCheck/all',
        handler: (request, reply) => {
            const start = new Date();
            return model.findAll()
                .then(() => {
                    const duration = new Date() - start;
                    reply([{
                        name: 'postgres',
                        up: true,
                        msg: `postgres is up. query time: ${duration}ms`,
                        duration
                    }]);
                })
                .catch((err) => {
                    const duration = new Date() - start;
                    logger.error(err, 'Unable to connect to postgres');
                    reply([{
                        name: 'postgress',
                        up: false,
                        msg: `postgress is down. query time: ${duration}ms`,
                        duration
                    }]);
                });
        }
    };

    return [
        healthCheck,
        healthCheckAll
    ];
};
