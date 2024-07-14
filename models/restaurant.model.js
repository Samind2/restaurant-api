const { DataTypes } = require("sequelize"); // นำเข้า DataTypes จากโมดูล sequelize
const sequelize = require("./db"); // นำเข้า instance ของ sequelize ที่เชื่อมต่อกับฐานข้อมูล

// กำหนด Schema ของฐานข้อมูลสำหรับตาราง Restaurant
const Restaurant = sequelize.define("restaurant", {
  id: {
    type: DataTypes.INTEGER, // ประเภทข้อมูลเป็นจำนวนเต็ม
    primaryKey: true, // กำหนดให้เป็น Primary Key
    autoIncrement: true, // ให้ค่าเพิ่มขึ้นอัตโนมัติเมื่อเพิ่มข้อมูลใหม่
  },
  name: {
    type: DataTypes.STRING, // ประเภทข้อมูลเป็นข้อความ
    allowNull: false, // ไม่อนุญาตให้ค่านี้เป็นค่าว่าง
  },
  type: {
    type: DataTypes.STRING, // ประเภทข้อมูลเป็นข้อความ
    allowNull: false, // ไม่อนุญาตให้ค่านี้เป็นค่าว่าง
  },
  imageUrl: {
    type: DataTypes.STRING, // ประเภทข้อมูลเป็นข้อความ
    allowNull: false, // ไม่อนุญาตให้ค่านี้เป็นค่าว่าง
  },
});

// สร้างตารางในฐานข้อมูล หากมีตารางอยู่แล้วจะลบและสร้างใหม่
Restaurant.sync({ force: true })
  .then(() => {
    console.log("Table created or already exists"); // แสดงข้อความเมื่อสร้างตารางสำเร็จหรือมีอยู่แล้ว
  })
  .catch((error) => {
    console.log("Error creating table", error); // แสดงข้อความเมื่อเกิดข้อผิดพลาดในการสร้างตาราง
  });

module.exports = Restaurant; // ส่งออกโมเดล Restaurant เพื่อให้สามารถใช้งานในไฟล์อื่นๆ ได้
