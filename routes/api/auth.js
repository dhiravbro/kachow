const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const restaurantModel = require("../../model/Restaurant");
const userModel = require("../../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

router.get("/", auth, async (req, res) => {
  try {
    const type = req.type;
    if (req.user) {
      const user = await userModel.findById(req.user.id).select("-password");
      return res.status(200).json({ user });
    } else if (req.restaurant) {
      const restaurant = await restaurantModel
        .findById(req.restaurant.id)
        .select("-password");
      return res.status(200).json({ restaurant });
    } else {
      res.status(401).json({ msg: "Bad request" });
    }
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "Server Error" });
  }
});

router.post(
  "/",
  [
    check("email", "Enter a valid email id").isEmail(),
    check("password", "Enter a valid password").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { email, password, type } = req.body;
      let payload;
      if (type === "User") {
        let user = await userModel.findOne({ email: email });
        if (!user) {
          return res
            .status(400)
            .json({ errors: [{ msg: "Invalid credentials" }] });
        }
        const passwordValid = await bcrypt.compare(password, user.password);
        if (!passwordValid) {
          return res.status(401).json({ msg: "Invalid Credentials" });
        }
        payload = {
          user: {
            id: user.id,
          },
        };
      } else if (type === "Restaurant") {
        let restaurant = await restaurantModel.findOne({ email: email });
        if (!restaurant) {
          return res
            .status(400)
            .json({ errors: [{ msg: "Invalid credentials" }] });
        }
        const passwordValid = await bcrypt.compare(
          password,
          restaurant.password
        );

        if (!passwordValid) {
          return res.status(401).json({ msg: "Invalid Credentials" });
        }
        payload = {
          restaurant: {
            id: restaurant.id,
          },
        };
      } else return res.status(401).json({ msg: "Invalid user access denied" });

      jwt.sign(
        payload,
        config.get("jwtSecretToken"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
