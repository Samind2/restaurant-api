const express = require("express");
const PORT = process.env.PORT || 5000;
const app = express();
require("dotenv").config();
const restaurantRouter = require("./routers/restaurant.router");

//use middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//use Router
app.use("/api/v1/restaurants", restaurantRouter);

app.get("/", (req, res) => {
  res.send("<h1>Hello Restaurant API</h1>");
});

app.listen(PORT, () => {
  console.log("Listening to http://localhost:" + PORT);
});
