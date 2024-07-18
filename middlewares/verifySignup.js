const User = require("../models/user.model");
const Role = require("../models/role.model");
const { checkout } = require("../routers/auth.router");
const { Op } = require("sequelize");

checkDuplicateUsernameOrEmail = async (req, res, next) => {
  // check Username
  await User.findOne({
    where: {
      username: req.body.username,
    },
  }).then((user) => {
    if (user) {
      res.status(400).send({ message: "Failed Username is already in user" });
      return;
    }
    //check Email
    User.findOne({
      where: {
        email: req.body.email,
      },
    }).then((user) => {
      if (user) {
        res.status(400).send({ message: "Failed Email is already in use" });
        return;
      }
      next();
    });
  });
};

//Check rold are valid
checlRolesExisted = async (req, res, next) => {
  if (req.body.roles) {
    Role.findAll({
      where: {
        name: { [Op.or]: req.body.roles },
      },
    }).then((roles) => {
      if (roles.length !== req.body.roles.length) {
        res.status(400).send({ message: "Failed! Roles not exist" });
        return;
      }
      next();
    });
  } else {
    next();
  }
};

const verifySignUp = {
    checlRolesExisted,
    checkDuplicateUsernameOrEmail,
};

module.exports = verifySignUp;