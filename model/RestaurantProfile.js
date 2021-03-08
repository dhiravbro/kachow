const mongoose = require("mongoose");

const restaurantProfileSchema = new mongoose.Schema({
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "restaurant",
  },
  address: {
    type: String,
  },
  description: {
    type: String,
    default: "Here are some great deals just for you",
  },
  profileImage: {
    type: {
      imageName: {
        type: String,
        default: "No Image Added",
        required: true,
      },
      imageData: {
        type: String,
        required: true,
      },
    },
  },
  avgRating: {
    type: Number,
    default: 0,
  },
  customersRated: {
    type: Number,
    default: 0,
  },
  coupons: {
    type: [
      {
        issueDate: {
          type: Date,
          default: Date.now,
        },
        expiryDate: {
          type: Date,
          required: true,
        },
        price: {
          type: Number,
          default: 0,
        },
        quantity: {
          type: Number,
          required: true,
        },
        couponType: {
          type: Number,
          required: true,
        },
        discount: {
          type: Number,
        },
        couponBalance: {
          type: Number,
        },
      },
    ],
  },
});
const restaurantProfileModel = mongoose.model(
  "restaurant-profile",
  restaurantProfileSchema
);
module.exports = restaurantProfileModel;
