const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  addedCash: {
    type: Number,
    default: 0,
  },
  coupons: {
    type: [
      {
        restaurantName: {
          type: String,
          required: true,
        },
        restaurantId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
        purchaseDate: {
          type: Date,
          required: true,
        },
        price: {
          type: Number,
          default: 0,
        },
        expiryDate: {
          type: Date,
          required: true,
        },
        couponType: {
          type: Number,
          required: true,
        },
        remainingCouponBalance: {
          type: Number,
        },
        discount: {
          type: Number,
        },
        addBalance: {
          type: Number,
        },
      },
    ],
  },
});
const userProfileModel = mongoose.model("user-profile", userProfileSchema);
module.exports = userProfileModel;
