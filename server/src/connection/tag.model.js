import Sequelize from 'sequelize';

const createTagModel = connection => connection.define('tag', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4()
    },
    name: Sequelize.STRING
});

export default createTagModel;
