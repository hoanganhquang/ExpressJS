const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;

app.use(express.json());


const data = JSON.parse(fs.readFileSync("./data.json"));

app.get("/api/v1/tours", (req, res) => {
  res.status(200).json(data);
});

app.post("/api/v1/tours", (req, res) => {
  console.log(req.body);
  res.send("done");
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
