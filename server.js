const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");
const port = process.env.PORT;

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then((con) => console.log("DB connection successful"))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
