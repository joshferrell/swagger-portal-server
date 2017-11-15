import Sequelize from 'sequelize';

const createDocModel = connection => connection.define('documentation', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4()
    },
    name: Sequelize.STRING,
    description: Sequelize.STRING,
    swaggerUrl: {
        type: Sequelize.STRING,
        validate: {
            isUrl: true
        }
    },
    dockerHubUrl: {
        type: Sequelize.STRING,
        validate: {
            isUrl: true
        }
    },
    repositoryUrl: {
        type: Sequelize.STRING,
        validate: {
            isUrl: true
        }
    },
    repositoryType: {
        type: Sequelize.STRING,
        validate: {
            isIn: [['bitbucket', 'github', 'gitlab']]
        }
    }
});

export default createDocModel;
