const express = require("express");
const PORT = 5000;
const app = express();

app.get("/", (req,res) => {
    res.send("<h1>Hello Restaurant API</h1>");
});

app.listen(PORT, () => {
    console.log("Listening to http://localhost:"+PORT);
});