const Sequelize = require("sequelize");


module.exports = (sequelize, type) => {
    // userId, tokenTypeId
    return sequelize.define('tokens', {

        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        token: type.STRING,
        type: type.STRING,
        expires:{
            type: Sequelize.DATE
        },
        blacklisted:{
            type: Sequelize.BOOLEAN
        }

    })
}