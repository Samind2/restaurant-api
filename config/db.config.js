require("dotenv").config({ path: "../.env" }); // นำเข้า dotenv เพื่อใช้ในการอ่านค่า environment variables จากไฟล์ .env ที่อยู่ในโฟลเดอร์หนึ่งระดับก่อนหน้า

module.exports = {
  HOST: process.env.HOST, // กำหนดค่า HOST โดยอ่านจาก environment variable HOST
  USER: process.env.USER, // กำหนดค่า USER โดยอ่านจาก environment variable USER
  PASSWORD: process.env.PASSWORD, // กำหนดค่า PASSWORD โดยอ่านจาก environment variable PASSWORD
  DB: process.env.DB, // กำหนดค่า DB โดยอ่านจาก environment variable DB
  dialect: "postgres", // กำหนดค่า dialect เป็น "postgres" ซึ่งหมายถึงการใช้ฐานข้อมูล PostgreSQL
  pool: {
    max: 5, // กำหนดจำนวน connection สูงสุดใน pool เป็น 5
    min: 0, // กำหนดจำนวน connection ต่ำสุดใน pool เป็น 0
    acquire: 30000, // กำหนดเวลาสูงสุด (มิลลิวินาที) ที่จะพยายามเชื่อมต่อ ก่อนที่จะเกิด error
    idle: 10000, // กำหนดเวลาสูงสุด (มิลลิวินาที) ที่ connection สามารถว่างอยู่ ก่อนที่จะถูกปล่อยออกจาก pool
  },
};