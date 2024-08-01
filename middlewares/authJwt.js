//TODO
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const db = require("../models");
const User = db.User;

//verify token
verifyToken = (req, res, next) => {
  let token = req.header["x-access-token"];
  //1st verify
  if (!token) {
    return res.status(403).send({ message: "No token provided!" }); //403 ไม่รู้ว่าผู้ใช้คือใครทำให้ผู้ใช้ไม่มีสิทธิ์เข้าถึง
  }
  //2nd verify
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" }); //401 รู้ว่าคือใครแต่ยังไม่มีสิทธิ์เข้าถึง
    }
    req.userId = decoded.id;
    next();
  });
};

//เช็คRole
//is Admin?
isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }
      return res
        .status(403)
        .send({ message: "Unauthorized access, Require Admim Role!!" });
    });
  });
};

//is Mod?
isMod = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }
      }
      return res
        .status(403)
        .send({ message: "Unauthorized access, Require Mod Role!!" });
    });
  });
};

//is AdminOrMod?
isModOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator" || roles[i].name === "admin") {
          next();
          return;
        }
      }
      return res
        .status(403)
        .send({
          message: "Unauthorized access, Require Moderator Or Admin Role!!",
        });
    });
  });
};

//Export
const authJwt = {
  verifyToken,
  isAdmin,
  isMod,
  isModOrAdmin,
};
module.exports = authJwt;
