const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const userModel = require("../../model/User");
const userProfileModel = require("../../model/UserProfile");
const { check, validationResult } = require("express-validator");
router.get("/me", auth, async (req, res) => {
  console.log(req.user);
  try {
    const userProfile = await userProfileModel
      .findOne({ user: req.user.id })
      .populate("user", ["name", "email"]);
    console.log(userProfile);
    if (!userProfile) {
      return res
        .status(401)
        .json({ msg: " Profile for this user does not exist" });
    }
    res.json(userProfile);
  } catch (err) {
    console.error(err.message);
    res.status(401).json({ msg: "Server Error" });
  }
});

router.post("/", auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(401).json({ errors: errors.array() });
  }
  const userProfileFields = {};
  userProfileFields.user = req.user.id;
  const { addedCash, coupons } = req.body;

  if (coupons) userProfileFields.coupons = coupons;

  try {
    let profile = await userProfileModel.findOne({
      user: req.user.id,
    });
    if (profile) {
      profile = await userProfileModel.findOne({ user: req.user.id });
      if (addedCash)
        profile.addedCash = Number(profile.addedCash) + Number(addedCash);
      profile.save();
      return res.json(profile);
    }
    profile = new userProfileModel(userProfileFields);
    await profile.save();
    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("server error");
  }
});

// router.get("/", auth, async (req, res) => {
//   try {
//     const userProfiles = await userProfileModel
//       .find()
//       .populate("user", ["name", "email"]);
//     return res.json(userProfiles);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });
router.get("/user/:user_id", auth, async (req, res) => {
  try {
    const userProfile = await userProfileModel
      .findOne({ user: req.params.user_id })
      .populate("user", ["name", "email"]);
    if (!userProfile) {
      return res.status(400).json({ msg: "user profile doesn't exist" });
    }

    return res.json(userProfile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: " user Profile doesn't exist" });
    }
    res.status(500).send("Server Error");
  }
});

router.delete("/", auth, async (req, res) => {
  try {
    await userProfileModel.findOneAndRemove({
      user: req.user.id,
    });
    await userModel.findByIdAndRemove({ _id: req.user.id });
    res.json({ msg: "user deleted" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});
router.post("/buy-food", auth, async (req, res) => {
  const { couponId, billAmount } = req.body;
  try {
    const userProfile = await userProfileModel.findOne({
      user: req.user.id,
    });
    const coupon = userProfile.coupons.id(couponId);
    if (coupon.remainingCouponBalance >= billAmount)
      coupon.remainingCouponBalance -= billAmount;
    else return res.status(400).json({ msg: "Insufficient coupon balance" });
    userProfile.save();
    return res.status(200).json({ couponId });
  } catch (err) {
    console.log(err.message);
  }
});
// router.put("/", auth , async(req,res) => {
//     let profile = await userProfile.findOne({user:req.user.id});
//     let
// })
module.exports = router;
