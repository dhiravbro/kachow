const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const restaurantModel = require("../../model/Restaurant");
const restaurantProfileModel = require("../../model/RestaurantProfile");
const userProfileModel = require("../../model/UserProfile");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, res, cb) => cb(null, "./uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + file.originalname),
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/png" || file.mimetype === "image/jpeg")
    cb(null, true);
  else cb(null, false);
};
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
});

const { check, validationResult } = require("express-validator");

router.get("/me", auth, async (req, res) => {
  try {
    const restaurantProfile = await restaurantProfileModel
      .findOne({ restaurant: req.restaurant.id })
      .populate("restaurant", ["name", "email"]);
    if (!restaurantProfile) {
      return res
        .status(401)
        .json({ msg: " Profile for this restaurant does not exist" });
    }
    res.json(restaurantProfile);
  } catch (err) {
    console.error(err.message);
    res.status(401).json({ msg: "Server Error" });
  }
});

router.post("/", [auth, upload.single("imageData")], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(401).json({ errors: errors.array() });
  }
  const restaurantProfileFields = {};
  restaurantProfileFields.restaurant = req.restaurant.id;
  console.log(req.file, "Update profile request file");
  const { address, description, imageName } = req.body;

  if (address) restaurantProfileFields.address = address;
  if (description) restaurantProfileFields.description = description;
  if (imageName && req.file) {
    restaurantProfileFields.profileImage = {};
    restaurantProfileFields.profileImage.imageName = imageName;
    restaurantProfileFields.profileImage.imageData = req.file.path;
  }
  try {
    let profile = await restaurantProfileModel.findOne({
      restaurant: req.restaurant.id,
    });
    if (profile) {
      profile = await restaurantProfileModel.findOneAndUpdate(
        { restaurant: req.restaurant.id },
        { $set: restaurantProfileFields },
        { new: true }
      );
      return res.json(profile);
    }
    profile = new restaurantProfileModel(restaurantProfileFields);
    await profile.save();
    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("server error");
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const restaurantProfiles = await restaurantProfileModel
      .find()
      .populate("restaurant", ["name", "email"]);
    return res.json(restaurantProfiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
router.get("/get-coupons/:restaurant_id", auth, async (req, res) => {
  try {
    const restaurantProfile = await restaurantProfileModel
      .findOne({ restaurant: req.params.restaurant_id })
      .populate("restaurant", ["name", "email"]);
    if (!restaurantProfile) {
      return res.status(400).json({ msg: "Restaurant profile doesn't exist" });
    }
    return res.json(restaurantProfile.coupons);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: " Restaurant Profile doesn't exist" });
    }
    res.status(500).send("Server Error");
  }
});

router.delete("/", auth, async (req, res) => {
  try {
    await restaurantProfileModel.findOneAndRemove({
      restaurant: req.restaurant.id,
    });
    await restaurantModel.findByIdAndRemove({ _id: req.restaurant.id });
    res.json({ msg: "Restaurant deleted" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});
router.post(
  "/add-coupon",
  [auth, [check("expiryDate").isDate()]],
  async (req, res) => {
    const {
      expiryDate,
      price,
      quantity,
      couponType,
      discount,
      couponBalance,
    } = req.body;
    couponFields = {
      expiryDate,
      price,
      quantity,
      couponType,
      discount,
      couponBalance,
    };
    try {
      const restaurantProfile = await restaurantProfileModel.findOne({
        restaurant: req.restaurant.id,
      });
      restaurantProfile.coupons.unshift(couponFields);
      try {
        await restaurantProfile.save();
        return res.status(200).json(restaurantProfile.coupons[0]);
      } catch (err) {
        return res.status(500).json({ msg: "Could not add coupon" });
      }
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error");
    }
  }
);

router.post("/buy-coupon", auth, async (req, res) => {
  const { restaurantId, couponId, restaurantName } = req.body;
  try {
    const restaurantProfile = await restaurantProfileModel.findOne({
      restaurant: restaurantId,
    });
    const coupon = restaurantProfile.coupons.id(couponId);
    if (coupon.quantity >= 1) coupon.quantity -= 1;
    else return res.status(400).json({ msg: "Coupon is out of stock" });
    const userProfile = await userProfileModel.findOne({
      user: req.user.id,
    });
    if (userProfile.addedCash >= coupon.price)
      userProfile.addedCash -= coupon.price;
    else return res.status(400).json({ msg: "Insufficient Cash Balance" });
    userProfile.coupons.unshift({
      restaurantId: restaurantId,
      restaurantName: restaurantName,
      price: coupon.price,
      expiryDate: coupon.expiryDate,
      couponType: coupon.couponType,
      discount: coupon.discount,
      remainingCouponBalance: coupon.couponBalance,
      purchaseDate: Date.now(),
    });
    userProfile.save();
    restaurantProfile.save();
    return res.status(200).json({ restaurantId, couponId });
  } catch (err) {
    console.log(err.message);
  }
});

router.post("/give-rating", auth, async (req, res) => {
  try {
    const { restaurantId, rating } = req.body;
    const restaurantProfile = await restaurantProfileModel.findOne({
      restaurant: restaurantId,
    });
    if (!restaurantProfile) {
      return res.status(400).json({ msg: "Restaurant profile doesn't exist" });
    }
    restaurantProfile.avgRating =
      (restaurantProfile.avgRating * restaurantProfile.customersRated +
        rating) /
      (restaurantProfile.customersRated + 1);
    restaurantProfile.customersRated += 1;
    restaurantProfile.save();
    return res.status(200).json({ msg: "Thank You for rating us!" });
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: " Restaurant Profile doesn't exist" });
    }
    res.status(500).send("Server Error");
  }
});
module.exports = router;
