const Sequelize = require("sequelize");


module.exports = (sequelize, type) => {
    return sequelize.define('users', {

        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        fullname: type.STRING,
        languageId: {
            type: Sequelize.INTEGER,
            defaultValue: 1
        },
        isEmailVerified: {
            type: Sequelize.STRING,
            defaultValue: false
        },
        picture: type.STRING,
        firstname: type.STRING,
        lastname: type.STRING,
        email: type.STRING,
        password: type.STRING,
        address: type.STRING,
        city: type.STRING,
        phone: type.STRING,
        country: type.STRING
    })
}