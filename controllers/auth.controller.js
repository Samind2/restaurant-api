const User = require("../models/user.model");
const Role = require("../models/role.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize"); // นำเข้า Op จาก Sequelize

exports.signup = async (req, res) => {
  const { userName, email, password, roles } = req.body;

  if (!userName || !email || !password) {
    return res.status(400).send({ message: "Please fill in all fields" });
  }

  const hashedPassword = bcrypt.hashSync(password, 8);

  const user = await User.create({
    userName: userName,
    email: email,
    password: hashedPassword,
  });

  if (roles) {
    const roleEntities = await Role.findAll({
      where: {
        name: {
          [Op.or]: roles,
        },
      },
    });
    await user.setRoles(roleEntities);
  } else {
    await user.setRoles([1]);
  }

  res.send({ message: "User was registered successfully!" });
};

exports.signin = async (req, res) => {
  const { userName, password } = req.body;

  const user = await User.findOne({
    where: {
      userName: userName,
    },
  });

  if (!user) {
    return res.status(404).send({ message: "User Not found." });
  }

  const passwordIsValid = bcrypt.compareSync(password, user.password);

  if (!passwordIsValid) {
    return res.status(401).send({
      accessToken: null,
      message: "Invalid Password!",
    });
  }

  const token = jwt.sign({ id: user.id }, process.env.SECRET, {
    expiresIn: 86400, // 24 ชั่วโมง
  });

  const authorities = [];
  const roles = await user.getRoles();
  for (let i = 0; i < roles.length; i++) {
    authorities.push("ROLE_" + roles[i].name.toUpperCase());
  }

  res.status(200).send({
    id: user.id,
    userName: user.userName,
    email: user.email,
    roles: authorities,
    accessToken: token,
  });
};
