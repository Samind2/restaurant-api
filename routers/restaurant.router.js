const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurant.controllers");
const { authJwt } = require("../middlewares");

//Creat a restaurant
router.post(
  "/",
  [authJwt.verifyToken, authJwt.isModOrAdmin],
  restaurantController.create
);

//get all restaurants
router.get("/", restaurantController.getAll);

//get a restaurants by Id
router.get("/:id", [authJwt.verifyToken], restaurantController.getById);

// Update a restaurant by ID
router.put(
  "/:id",
  [authJwt.verifyToken, authJwt.isModOrAdmin],
  restaurantController.update
);

// Delete a restaurant by ID
router.delete(
  "/:id",
  [authJwt.verifyToken, authJwt.isAdmin],
  restaurantController.delete
);

module.exports = router;
