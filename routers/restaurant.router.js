const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurant.controllers");

//Creat a restaurant
router.post("/", restaurantController.create);

//get all restaurants
router.get("/", restaurantController.getAll);

//get a restaurants by Id
router.get("/:id", restaurantController.getById);

// Update a restaurant by ID
router.put("/:id", restaurantController.update);

module.exports = router;
