import { stdSerializers } from 'boom';

export const createGoodOptions = (logger) => {
    const eventFilter = {
        request: '*', log: '*', response: '*', error: '*'
    };

    return ({
        includes: {
            request: ['headers', 'payload'],
            response: ['payload']
        },
        ops: {
            interval: 2160000
        },
        reporters: {
            bunyan: [
                {
                    module: 'good-squeeze',
                    name: 'Squeeze',
                    args: [eventFilter]
                },
                {
                    module: 'good-bunyan',
                    args: [
                        eventFilter,
                        {
                            logger,
                            formatters: {
                                request: ({ data, ...req }) => ({
                                    ...req,
                                    err: stdSerializers(data.err),
                                    data
                                })
                            }
                        }
                    ]
                }
            ]
        }
    });
};

const createProductionPlugins = (logger) => {
    const goodOptions = createGoodOptions(logger);
    return [
        {
            plugin: {
                register: 'good',
                options: goodOptions
            }
        }
    ];
};

export default createProductionPlugins;
