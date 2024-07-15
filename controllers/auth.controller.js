const config = require("../config/auth.config");
const db = require("../models");
const User = db.User;
const Role = db.Role;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");

//Register a new user

exports.signup = async (req, res) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    res.status(400).send({
      message: "Please provide all required fields",
    });
    return;
  }

  //Pripare data user
  const newUser = {
    username: username,
    password: bcrypt.hashSync(password, 8),
    email: email,
  };

  //Save user in dtb
  await User.create(newUser).then((user) => {
    if (req.body.roles) {
      Role.findAll({
        where: {
          name: { [Op.or]: req.body.role },
        },
      }).then((roles) => {
        user.setRokes(roles).then(() => {
          res.send({
            message: "User registered successful",
          });
        });
      });
    } else {
      //set defautl role to "user" id=1
      user.setRoles([1]).then(() => {
        res.send({
          message: "User registered successful",
        });
      });
    }
  }).catch((error) => {
    res.status(500).send({
        message: error.message || "Something error occured while registering a new user"
    })
  })
};
