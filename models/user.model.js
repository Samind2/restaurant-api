const { DataTypes } = require("sequelize");
const sequelize = require("./db");

// กำหนด Schema ของฐานข้อมูลสำหรับตาราง Restaurant
const User = sequelize.define("user", {
  username: {
    type: DataTypes.STRING, // ประเภทข้อมูลเป็นข้อความ
    primaryKey: true, // กำหนดให้เป็น Primary Key
    allowNull: false, // ไม่อนุญาตให้ค่านี้เป็นค่าว่าง
  },
  password: {
    type: DataTypes.STRING, // ประเภทข้อมูลเป็นข้อความ
    allowNull: false, // ไม่อนุญาตให้ค่านี้เป็นค่าว่าง
  },
  email: {
    type: DataTypes.STRING, // ประเภทข้อมูลเป็นข้อความ
    allowNull: false, // ไม่อนุญาตให้ค่านี้เป็นค่าว่าง
  },
});

module.exports = User;
