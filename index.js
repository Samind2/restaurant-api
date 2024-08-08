const express = require("express");
const cors = require("cors"); // Import cors package
const PORT = process.env.PORT || 5000;
const app = express();
require("dotenv").config();
const restaurantRouter = require("./routers/restaurant.router");
const authRouter = require("./routers/auth.router");
const db = require("./models/");
const Role = db.Role;

const initRole = () => {
  Role.create({ id: 1, name: "user" });
  Role.create({ id: 2, name: "moderator" });
  Role.create({ id: 3, name: "admin" });
};

// Use cors middleware
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from this origin
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}));

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
