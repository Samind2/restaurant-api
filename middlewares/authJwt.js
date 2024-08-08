const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const db = require("../models");
const User = db.User;

// Verify Token
const verifyToken = (req, res, next) => {
  // Access token from headers
  let token = req.headers["x-access-token"]; // Use headers, not header

  // Check if token is provided
  if (!token) {
    return res.status(403).send({ message: "No token provided!" }); // 403 Forbidden
  }

  // Verify token
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" }); // 401 Unauthorized
    }
    req.userId = decoded.id;
    next();
  });
};

// Check if user is Admin
const isAdmin = (req, res, next) => {
  User.findByPk(req.userId)
    .then(user => user.getRoles())
    .then(roles => {
      for (let role of roles) {
        if (role.name === "admin") {
          next();
          return;
        }
      }
      return res.status(403).send({ message: "Unauthorized access, Require Admin Role!" }); // 403 Forbidden
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

// Check if user is Moderator
const isMod = (req, res, next) => {
  User.findByPk(req.userId)
    .then(user => user.getRoles())
    .then(roles => {
      for (let role of roles) {
        if (role.name === "moderator") {
          next();
          return;
        }
      }
      return res.status(403).send({ message: "Unauthorized access, Require Mod Role!" }); // 403 Forbidden
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

// Check if user is Admin or Moderator
const isModOrAdmin = (req, res, next) => {
  User.findByPk(req.userId)
    .then(user => user.getRoles())
    .then(roles => {
      for (let role of roles) {
        if (role.name === "moderator" || role.name === "admin") {
          next();
          return;
        }
      }
      return res.status(403).send({ message: "Unauthorized access, Require Moderator Or Admin Role!" }); // 403 Forbidden
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

// Export middleware
const authJwt = {
  verifyToken,
  isAdmin,
  isMod,
  isModOrAdmin
};

module.exports = authJwt;
