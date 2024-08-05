// index.js

const express = require("express");
const PORT = process.env.PORT || 5000;
const app = express();
require("dotenv").config();
const restaurantRouter = require("./routers/restaurant.router");
const authRouter = require("./routers/auth.router");
const sequelize = require("./models/db"); // นำเข้า instance ของ sequelize ที่เชื่อมต่อกับฐานข้อมูล
const Role = require("./models/role.model");
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:5173",
};

// โหมดพัฒนา
// sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
//   initRole();
// });

const initRole = () => {
  Role.create({ id: 1, name: "user" });
  Role.create({ id: 2, name: "moderator" });
  Role.create({ id: 3, name: "admin" });
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/restaurants", restaurantRouter);
app.use("/api/v1/auth", authRouter);

app.get("/", (req, res) => {
  res.send("<h1>Hello Restaurant API</h1>");
});

app.listen(PORT, () => {
  console.log("Listening to http://localhost:" + PORT);
});
