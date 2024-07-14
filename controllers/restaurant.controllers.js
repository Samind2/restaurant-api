const Restaurant = require("../models/restaurant.model");

//Create and Save a New Restaurant
// สร้างและบันทึกร้านอาหารใหม่
exports.create = async (req, res) => {
  // ดึงข้อมูล name, type และ imageUrl จาก body ของคำขอ
  const { name, type, imageUrl } = req.body;
  // ตรวจสอบว่าข้อมูล name, type และ imageUrl ต้องไม่เป็นค่าว่าง
  if (!name || !type || !imageUrl) {
    res.status(400).send({
      message: "Name, Type or ImgUrl can not be empty!",
    });
  }

  // ตรวจสอบว่ามีร้านอาหารที่มีชื่อนี้อยู่แล้วหรือไม่
  await Restaurant.findOne({ where: { name: name } }).then((restaurant) => {
    if (restaurant) {
      res.status(400).send({
        message: "Restaurant already exists!",
      });
      return;
    }
    // สร้างร้านอาหารใหม่
    const newRestaurant = {
      name: name,
      type: type,
      imageUrl: imageUrl,
    };
    // บันทึกร้านอาหารใหม่ลงฐานข้อมูล
    Restaurant.create(newRestaurant)
      .then((data) => {
        res.send(data);
      })
      .catch((error) => {
        res.status(500).send({
          message:
            error.message || "Something error occured creating the restaurant.",
        });
      });
  });
};

// ดึงข้อมูลร้านอาหารทั้งหมด
exports.getAll = async (req, res) => {
  await Restaurant.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Something error occured creating the restaurant.",
      });
    });
};

// ดึงข้อมูลร้านอาหารตาม ID
exports.getById = async (req, res) => {
  const id = req.params.id;
  await Restaurant.findByPk(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "No found Restaurants with id " + id });
      } else {
        res.send(data);
      }
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Something error occured creating the restaurant.",
      });
    });
};

// อัปเดตร้านอาหาร
exports.update = async (req, res) => {
  const id = req.params.id;
  await Restaurant.update(req.body, {
    where: {
      id: id,
    },
  })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Restaurant was update successfully" });
      } else {
        res.send({
          message:
            "Cannot update restaurant with id " +
            id +
            ". Maybe restaurant was not found or res.body is empty!",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.massage ||
          "Something error occured while creating the restaurant.",
      });
    });
};

// ลบร้านอาหาร
exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    // ลบร้านอาหารตาม ID
    const num = await Restaurant.destroy({
      where: { id: id },
    });

    if (num === 1) {
      res.send({ message: "Restaurant was deleted successfully" });
    } else {
      res.send({
        message: "Cannot delete restaurant with id=" + id + ".",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error deleting restaurant with id=" + id,
      error: error.message,
    });
  }
};
