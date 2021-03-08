import {
  SHOW_USER_COUPONS,
  BUY_COUPON,
  ADD_BALANCE,
  ADD_BALANCE_ERROR,
  LOAD_USER_PROFILE,
  LOAD_USER_PROFILE_ERROR,
} from "./types";
import axios from "axios";
// export const showCoupons = () => async (dispatch) => {
//   const coupons = await userProfileModel.find();
//   dispatch({
//     type: SHOW_USER_COUPONS,
//     payload: coupons,
//   });
// };

export const loadUserProfile = () => async (dispatch) => {
  console.log("actions user profile");
  try {
    const res = await axios.get("/api/user-profile/me");
    dispatch({
      type: LOAD_USER_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: LOAD_USER_PROFILE_ERROR,
    });
  }
};
export const createUserProfile = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({});
    await axios.post("/api/user-profile", body, config);
    dispatch(loadUserProfile());
  } catch (err) {
    console.log(err.message);
    dispatch({
      type: LOAD_USER_PROFILE_ERROR,
    });
  }
};
export const buyCoupon = ({ restaurantId, couponId, restaurantName }) => async (
  dispatch
) => {
  console.log({ restaurantId, couponId, restaurantName });
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ restaurantId, couponId, restaurantName });
    const res = await axios.post(
      "/api/restaurant-profile/buy-coupon",
      body,
      config
    );
    dispatch({
      type: BUY_COUPON,
      payload: {
        restaurantId: res.data.restaurantId,
        couponId: res.data.couponId,
      },
    });
  } catch (err) {
    console.log(err.message);
  }
};
export const addCashBalance = (balance) => async (dispatch) => {
  console.log("actions add cash");
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ addedCash: balance });
    const res = await axios.post("/api/user-profile", body, config);
    dispatch({
      type: ADD_BALANCE,
      payload: res.data,
    });
    window.location.href = "/";
  } catch (err) {
    console.log(err.message);
    dispatch({
      type: ADD_BALANCE_ERROR,
    });
  }
};

export const buyFood = ({ couponId, billAmount }) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ couponId, billAmount });
    const res = await axios.post("/api/user-profile/buy-food", body, config);
    window.location.href = "/";
  } catch (err) {
    console.log(err.message);
  }
};
// export const create = ({ address, description }) => async (
//   dispatch
// ) => {
//   try {
//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };
//     const body = JSON.stringify({ address, description });
//     const res = await axios.post("/api/restaurant-profile", body, config);
//     dispatch({
//       type: UPDATE_RESTAURANT_PROFILE,
//       payload: res.data,
//     });
//     window.location.href = "/";
//   } catch (err) {
//     console.log(err.message);
//     dispatch({
//       type: UPDATE_RESTAURANT_PROFILE_ERROR,
//     });
//   }
// };
