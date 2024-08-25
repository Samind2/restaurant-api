const Restaurant = require("../models/restaurant.model");

// Create and Save a New Restaurant
exports.create = async (req, res) => {
  const { name, type, imageUrl } = req.body;
  if (!name || !type || !imageUrl) {
    res.status(400).send({
      message: "Name, Type or ImgUrl can not be empty!",
    });
    return; // ใช้ return เพื่อหยุดการทำงานต่อ
  }

  try {
    const restaurant = await Restaurant.findOne({ where: { name: name } });
    if (restaurant) {
      res.status(400).send({
        message: "Restaurant already exists!",
      });
      return;
    }

    const newRestaurant = { name, type, imageUrl };
    const data = await Restaurant.create(newRestaurant);
    res.send(data);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Something error occurred creating the restaurant.",
    });
  }
};

// Get all restaurants
exports.getAll = async (req, res) => {
  try {
    const data = await Restaurant.findAll();
    res.send(data);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Something error occurred retrieving the restaurants.",
    });
  }
};

// Get restaurant by ID
exports.getById = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Restaurant.findByPk(id);
    if (!data) {
      res.status(404).send({ message: "Not found restaurant with id " + id });
    } else {
      res.send(data);
    }
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Something error occurred retrieving the restaurant.",
    });
  }
};

// Update a restaurant
exports.update = async (req, res) => {
  const id = req.params.id;
  try {
    const [num] = await Restaurant.update(req.body, {
      where: { id: id },
    });
    if (num === 1) {
      res.send({ message: "Restaurant was updated successfully" });
    } else {
      res.send({
        message:
          "Cannot update restaurant with id " +
          id +
          ". Maybe restaurant was not found or req.body is empty!",
      });
    }
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        "Something error occurred while updating the restaurant.",
    });
  }
};

// Delete a restaurant
exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
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
