const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./main/Database/index.js");
const User = db.User;
const port = process.env.PORT || 4000;
const ApiRoute = require("./main/MainRouter.js");
// require('./API/Controllers/AssignmentController.js')

app.use(cors());
app.use(express.json());
app.use("/api", ApiRoute);

app.get("/", (req, res) => {
  res.send("Welcome to Qitt Api V1.0");
});

// Server Running
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Export the Express API
module.exports = app;
