const Restaurant = require("../models/restaurant.model");

//Create and Save a New Restaurant
exports.create = async (req, res) => {
  const { name, type, imageUrl } = req.body;
  if (!name || !type || !imageUrl) {
    res.status(400).send({
      message: "Name, Type or ImgUrl can not be empty!",
    });
  }

  await Restaurant.findOne({ where: { name: name } }).then((restaurant) => {
    if (restaurant) {
      res.status(400).send({
        message: "Restaurant already exists!",
      });
      return;
    }
    //Create a New Restaurant
    const newRestaurant = {
      name: name,
      type: type,
      imageUrl: imageUrl,
    };
    Restaurant.create(newRestaurant)
      .then((data) => {
        res.send(data);
      })
      .catch((error) => {
        res.status(500).send({
          message:
            error.message || "Somthing error occured creating the restaurant.",
        });
      });
  });
};

exports.getAll = async (req, res) => {
  await Restaurant.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Somthing error occured creating the restaurant.",
      });
    });
};

//get by ID
exports.getById = async (req, res) => {
  const id = req.params.id;
  await Restaurant.findByPk(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "No found Restaurants with id" + id });
      } else {
        res.send(data);
      }
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Somthing error occured creating the restaurant.",
      });
    });
};

//update
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
            "Cannot update restaurant with id" +
            id +
            ". Maybe restaurant was not found or res.body is empty!",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.massage ||
          "Somthing error occured while creating the restaurant.",
      });
    });
};

// Delete
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

