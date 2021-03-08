import axios from "axios";
import {
  LOAD_RESTAURANT_LIST,
  LOAD_RESTAURANT_PROFILE_ERROR,
  UPDATE_RESTAURANT_PROFILE,
  UPDATE_RESTAURANT_PROFILE_ERROR,
  ADD_COUPON_ERROR,
  CREATE_RESTAURANT_PROFILE_ERROR,
  CREATE_RESTAURANT_PROFILE,
} from "./index";
import { ADD_COUPON, LOAD_RESTAURANT_PROFILE } from "./types";
import setAuthToken from "../../utils/setAuthToken";
export const loadRestaurantList = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("/api/restaurant-profile");
    console.log(res.data);
    dispatch({
      type: LOAD_RESTAURANT_LIST,
      payload: res.data,
    });
  } catch (err) {
    console.log(err.response);
  }
};

export const loadRestaurantProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/restaurant-profile/me");
    dispatch({
      type: LOAD_RESTAURANT_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: LOAD_RESTAURANT_PROFILE_ERROR,
    });
  }
};
export const createRestaurantProfile = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({});
    const res = await axios.post("/api/restaurant-profile", body, config);
    console.log(res.data);
    dispatch({
      type: CREATE_RESTAURANT_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    console.log(err.message);
    dispatch({
      type: CREATE_RESTAURANT_PROFILE_ERROR,
    });
  }
};
export const updateRestaurantProfile = (profileFormObj) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    // let reqObject = new FormData();
    // console.log(imageFormObj.body.imageName);
    // const body = JSON.stringify({ address, description, imageFormObj });
    const res = await axios.post(
      "/api/restaurant-profile",
      profileFormObj,
      config
    );
    dispatch({
      type: UPDATE_RESTAURANT_PROFILE,
      payload: res.data,
    });
    window.location.href = "/";
  } catch (err) {
    console.log(err.message);
    dispatch({
      type: UPDATE_RESTAURANT_PROFILE_ERROR,
    });
  }
};

export const addCoupon = ({
  couponType,
  expiryDate,
  price,
  quantity,
  discount,
  couponBalance,
}) => async (dispatch) => {
  console.log("actions add coupon");
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({
      couponType,
      expiryDate,
      price,
      quantity,
      discount,
      couponBalance,
    });
    await axios.post("/api/restaurant-profile/add-coupon", body, config);
    dispatch({
      type: ADD_COUPON,
    });
    window.location.href = "/";
  } catch (err) {
    console.log(err.message);
    dispatch({
      type: ADD_COUPON_ERROR,
    });
  }
};
