const { Sequelize } = require('sequelize');
//const config = require('../config/database');
const { DATABASE_URL } = process.env;
const sequelize = new Sequelize(DATABASE_URL);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
