'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const config = require(__dirname + '/../config/config.js');
const db = {};



let sequelize;
console.log("loaded index file");
console.log( {...config.sequelize.options})
sequelize = new Sequelize(
  config.sequelize.database,
  config.sequelize.username,
  config.sequelize.password,
  {...config.sequelize.options});

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.user = require('./user.model')(sequelize, Sequelize);
db.token = require('./token.model')(sequelize, Sequelize);

db.token.belongsTo(db.user, {
  constraints: false

});
db.user.hasMany(db.token);

module.exports = db;
