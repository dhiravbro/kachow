const express = require("express");
const app = express();
const mongodb = require("./config/mongodb");
const bodyParser = require("body-parser");
let userModel = require("./model/User");
// let tryModel = require("./model/trymodel");
mongodb();
//Init body parser
app.use(bodyParser.json({ extended: false }));

app.use("/api/users", require("./routes/api/users"));
app.use("/api/restaurants", require("./routes/api/restaurants"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/user-profile", require("./routes/api/userProfiles"));
app.use("/api/restaurant-profile", require("./routes/api/restaurantProfiles"));
app.use("/profile-image", express.static("uploads"));
app.get("/", async (req, res) => {
  try {
    let userDetails = new userModel({
      email: "sabhayjains@gmail.com",
    });
    // userDetails.save();

    res.send("hello");
  } catch (err) {
    console.error(err.message);
    console.log("There was some error in connection");
  }
});

app.listen(5000, function (req, res) {
  console.log("server started on port 5000");
});
