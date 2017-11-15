import Boom from 'boom';

export const healthStatus = (request, reply) =>
    reply({ status: 'OK' });

export const makeDependencyStatus = dependencyChecks => (request, reply) =>
    Promise
        .all([dependencyChecks.map(x => x())])
        .then((dependencies) => {
            dependencies
                .filter(({ up }) => up === false)
                .forEach(dependency => request.log('error', {
                    msg: `unable to access ${dependency.name}`,
                    dependency
                }));

            return reply(dependencies);
        })
        .catch((err) => {
            request.log('error', {
                err,
                msg: 'unable to check dependencies'
            });
            return reply(Boom.badImplementation());
        });
