const express = require("express"); // นำเข้า express framework
const router = express.Router(); // สร้าง router object จาก express
const restaurantController = require("../controllers/restaurant.controllers"); // นำเข้า controller สำหรับ restaurant

// สร้าง restaurant ใหม่
router.post("/", restaurantController.create); 

// ดึงข้อมูล restaurant ทั้งหมด
router.get("/", restaurantController.getAll); 

// ดึงข้อมูล restaurant โดยใช้ id
router.get("/:id", restaurantController.getById); 

// อัพเดทข้อมูล restaurant โดยใช้ id
router.put("/:id", restaurantController.update); 

// ลบ restaurant โดยใช้ id
router.delete("/:id", restaurantController.delete); 

module.exports = router; // ส่งออก router เพื่อให้สามารถใช้งานในไฟล์อื่นๆ ได้
