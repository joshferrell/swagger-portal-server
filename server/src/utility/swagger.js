import joi from 'joi';

export const success = {
    200: {
        description: 'Success',
        schema: joi.object({
            success: joi.boolean().required()
        }).required()
    }
};

export const badRequest = {
    400: {
        description: 'Bad Request',
        schema: joi.object({
            statusCode: joi.string().equal('400').required(),
            error: joi.string().equal('Bad Request').required(),
            message: joi.string().required(),
            validation: joi.object({
                source: joi.string().required(),
                keys: joi.array().items(joi.string()).required()
            })
        }).required()
    }
};

export const unauthorized = {
    401: {
        description: 'Unauthorized',
        schema: joi.object({
            statusCode: joi.string().equal('401').required(),
            error: joi.string().equal('Unauthorized').required(),
            message: joi.string().required()
        }).required()
    }
};

export const notFound = {
    404: {
        description: 'Not Found',
        schema: joi.object({
            statusCode: joi.string().equal('404').required(),
            error: joi.string().equal('Not Found').required(),
            message: joi.string().required()
        }).required()
    }
};

export const internalError = {
    500: {
        description: 'Internal Server Error',
        schema: joi.object({
            statusCode: joi.string().equal('500').required(),
            error: joi.string().equal('Internal Server Error').required(),
            message: joi.string().equal('An internal server error occurred').required()
        }).required()
    }
};

export const notImplemented = {
    501: {
        description: 'Not Implemented',
        schema: joi.object({
            statusCode: joi.string().equal('501').required(),
            error: joi.string().equal('Not Implemented').required(),
            message: joi.string().equal('method not implemented').required()
        }).required()
    }
};

export const healthCheck = {
    200: {
        description: 'Server Online',
        schema: joi.object({
            status: joi.string().equal('OK').required()
        }).required()
    }
};

export const checkDependency = {
    200: {
        description: 'Dependencies Online',
        schema: joi
            .array()
            .unique()
            .items(joi.object({
                name: joi.string().valid(['postgres']).required(),
                up: joi.boolean().required(),
                duration: joi.number().required(),
                msg: joi.string().required()
                    .label('Human readable response about dependency status')
            }))
            .required()
    }
};
