const mongoose = require("mongoose");
const app = require("./app");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

// Connection String For MongoDB
const DB = process.env.CONNECTION_STRING.replace(
  "<PASSWORD>",
  process.env.PASSWORD
);

// Mongoo DB Connection Establish
mongoose
  .connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("DB connection successful"));

//Server PORT No
const PORT = process.env.PORT_NO;

app.listen(PORT, () => {
  console.log(` server running on port no ` + PORT);
});
