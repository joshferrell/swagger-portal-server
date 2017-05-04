import Sequelize from 'sequelize';

export const createConnection = () => new Sequelize(
    process.env.POSTGRES_DB,
    process.env.POSTGRES_USER,
    process.env.POSTGRES_PASSWORD,
    {
        host: process.env.SERVER_POSTGRES_HOST,
        dialect: 'postgres'
    });
