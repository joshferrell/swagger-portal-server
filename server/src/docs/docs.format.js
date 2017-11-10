import joi from 'joi';

export const patchFormat = joi.object().keys({
    name: joi.string()
        .description('api name')
        .example('pet shop'),
    description: joi.string()
        .description('brief description about server')
        .example('This is a sample server Petstore server'),
    tags: joi.array().items(joi.string()).single()
        .description('tags that relate to the service')
        .example(['pets', 'store']),
    swaggerUrl: joi.string().uri()
        .description('url for hosted swagger docs')
        .example('http://petstore.swagger.io/v2/swagger.json'),
    repositoryUrl: joi.string().uri()
        .description('url for repository with source code')
        .example('https://github.com/joshferrell/swagger-portal-server'),
    repositoryType: joi.string().valid(['bitbucket', 'github', 'gitlab'])
        .description('host for repository used for ui')
        .example('github'),
    dockerHubUrl: joi.string().uri()
        .description('docker hub url for api container')
        .example('https://hub.docker.com/r/jferrell/swagger-portal-server/')
}).or([
    'name',
    'description',
    'tags',
    'swaggerUrl',
    'repositoryUrl',
    'respositoryType',
    'dockerHubUrl'
]);

export const postFormat = {
    name: joi.string().required()
        .description('api name')
        .example('pet shop'),
    description: joi.string().required()
        .description('brief description about server')
        .example('This is a sample server Petstore server'),
    tags: joi.array().items(joi.string()).single()
        .description('tags that relate to the service')
        .example(['pets', 'store']),
    swaggerUrl: joi.string().uri().required()
        .description('url for hosted swagger docs')
        .example('http://petstore.swagger.io/v2/swagger.json'),
    repositoryUrl: joi.string().uri()
        .description('url for repository with source code')
        .example('https://github.com/joshferrell/swagger-portal-server'),
    repositoryType: joi.string().valid(['bitbucket', 'github', 'gitlab'])
        .description('host for repository used for ui')
        .example('github'),
    dockerHubUrl: joi.string().uri()
        .description('docker hub url for api container')
        .example('https://hub.docker.com/r/jferrell/swagger-portal-server/')
};

export const responseFormat = {
    id: joi.string().uuid(['uuidv4']).required(),
    url: joi.string().uri().required()
        .description('url that the data can be fetched from'),
    createdAt: joi.date().iso().required()
        .description('date that the data was created')
        .example('2017-01-01'),
    updatedAt: joi.date().iso().required()
        .description('date that the data was last updated')
        .example('2017-01-02'),
    ...postFormat
};
