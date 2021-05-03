const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");


class User extends Model {
  // check password 
  checkPassword(loginPW) {
    return bcrypt.compareSync(loginPW, this.password);
  }
}

// define table columns and configuration
User.init(
  {
    // define an id column
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {       // define a username column
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {    // define a password column
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4], // min character length
      },
    },
  },
  {     
    hooks: {
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      async beforeUpdate(updatedUserData) {
        updatedUserData.password = await bcrypt.hash(
          updatedUserData.password,
          10
        );
        return updatedUserData;
      },
    },
    sequelize, // pass in connection
    timestamps: false, // no automatic created_at etc.
    freezeTableName: true, // avoid pluralizing our table names
    underscored: true, // no camelCase use under_score
    modelName: "user", // ensure user is lowercase in db
  }
);

module.exports = User;
