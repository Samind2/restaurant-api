const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const db = require("../models");
const User = db.User;

// Verify token
const verifyToken = async (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  try {
    const decoded = jwt.verify(token, config.secret);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).send({ message: "Unauthorized!" });
  }
};

// Check if user is Admin
const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    if (!user) return res.status(404).send({ message: "User not found" });

    const roles = await user.getRoles();
    const isAdminRole = roles.some((role) => role.name === "admin");

    if (isAdminRole) {
      next();
    } else {
      return res
        .status(403)
        .send({ message: "Unauthorized access, Require Admin Role!!" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Check if user is Moderator
const isMod = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    if (!user) return res.status(404).send({ message: "User not found" });

    const roles = await user.getRoles();
    const isModRole = roles.some((role) => role.name === "moderator");

    if (isModRole) {
      next();
    } else {
      return res
        .status(403)
        .send({ message: "Unauthorized access, Require Mod Role!!" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Check if user is Admin or Moderator
const isModOrAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    if (!user) return res.status(404).send({ message: "User not found" });

    const roles = await user.getRoles();
    const hasRole = roles.some(
      (role) => role.name === "moderator" || role.name === "admin"
    );

    if (hasRole) {
      next();
    } else {
      return res
        .status(403)
        .send({
          message: "Unauthorized access, Require Moderator Or Admin Role!!",
        });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Export
const authJwt = {
  verifyToken,
  isAdmin,
  isMod,
  isModOrAdmin,
};
module.exports = authJwt;
