const express = require("express"); // นำเข้า express framework
const PORT = process.env.PORT || 5000; // กำหนดพอร์ตจากตัวแปรสภาพแวดล้อม (ถ้ามี) หรือใช้ 5000
const app = express(); // สร้างแอปพลิเคชัน express
require("dotenv").config(); // นำเข้า dotenv เพื่อโหลดตัวแปรสภาพแวดล้อมจากไฟล์ .env
const restaurantRouter = require("./routers/restaurant.router"); // นำเข้า router สำหรับ restaurant
const authRouter = require("./routers/auth.router");
const db = require("./models/"); // นำเข้าโมเดลของฐานข้อมูล
const Role = db.Role; // นำเข้าโมเดล Role
const cors = require("cors");

const corsOption = () => {
  origin: "http://localhost:5173";
};

// โหมดพัฒนา
/*
db.sequelize.sync({ force: true }).then(() => {
  initRole();
  console.log("Drop and Sync DB");
});
*/

const initRole = () => {
  Role.create({ id: 1, name: "user" });
  Role.create({ id: 2, name: "moderator" });
  Role.create({ id: 3, name: "admin" });
};

// ใช้ middleware สำหรับจัดการ JSON และ URL-encoded data
app.use(cors(corsOption));
app.use(express.json()); // ใช้ middleware เพื่อจัดการกับ JSON request body
app.use(express.urlencoded({ extended: true })); // ใช้ middleware เพื่อจัดการกับ URL-encoded request body

// ใช้ router สำหรับเส้นทางที่ขึ้นต้นด้วย /api/v1/restaurants
app.use("/api/v1/restaurants", restaurantRouter);
app.use("/api/v1/auth", authRouter);

// กำหนดเส้นทางเริ่มต้น
app.get("/", (req, res) => {
  res.send("<h1>Hello Restaurant API</h1>"); // ส่งข้อความ HTML เป็น response
});

// เริ่มเซิร์ฟเวอร์และฟังที่พอร์ตที่กำหนด
app.listen(PORT, () => {
  console.log("Listening to http://localhost:" + PORT); // แสดงข้อความเมื่อเซิร์ฟเวอร์เริ่มทำงาน
});
