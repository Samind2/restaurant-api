// models/user.model.js

const { DataTypes } = require("sequelize");
const sequelize = require("./db"); // นำเข้า instance ของ sequelize ที่เชื่อมต่อกับฐานข้อมูล

const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;

