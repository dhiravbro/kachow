const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const restaurantModel = require("../../model/Restaurant");
const jwt = require("jsonwebtoken");
const config = require("config");
router.post(
  "/",
  [
    check("name", "Provide a username").not().isEmpty(),
    check("email", "Please enter a valid email id").isEmail(),
    check("password", "Enter a password of length 6 or more").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      console.log(req.body);
      const { name, email, password } = req.body;
      console.log(req.body);
      let restaurant = await restaurantModel.findOne({ email: email });
      if (restaurant) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Restaurant already exists" }] });
      }

      restaurant = new restaurantModel({
        name: name,
        email: email,
        password: password,
      });
      const salt = await bcrypt.genSalt(10);
      restaurant.password = await bcrypt.hash(password, salt);
      await restaurant.save();
      // res.send("Restaurant registered");
      const payload = {
        restaurant: {
          id: restaurant.id,
        },
        type: "restaurant",
      };
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
