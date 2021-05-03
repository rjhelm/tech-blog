const Sequelize = require('sequelize');
// require dotenv file 
require('dotenv').config();
let sequelize;
// use jawsdb through heroku then create a new sequelize instance
if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
    // or create a sequelize instance with the following db info
} else {
    sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
    });
}
module.exports = sequelize;