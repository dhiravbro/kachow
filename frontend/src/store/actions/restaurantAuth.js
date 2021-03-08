import {
  REGISTER_RESTAURANT_FAILURE,
  REGISTER_RESTAURANT_SUCCESS,
  RESTAURANT_LOADED,
  AUTH_ERROR,
  RESTAURANT_LOGIN_ERROR,
  RESTAURANT_LOGGED_IN,
  LOGOUT_RESTAURANT,
} from "./types";
import axios from "axios";
import setAuthToken from "../../../src/utils/setAuthToken";
import { createRestaurantProfile } from "./restaurant";
export const loadRestaurant = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("/api/auth");
    dispatch({
      type: RESTAURANT_LOADED,
      payload: { ...res.data, token: localStorage.token },
    });
  } catch (err) {
    console.log(err.message);
    dispatch({
      type: AUTH_ERROR,
    });
  }
};
export const registerRestaurant = ({
  name,
  email,
  address,
  password,
}) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post("/api/restaurants", body, config);
    dispatch({
      type: REGISTER_RESTAURANT_SUCCESS,
      payload: res.data,
    });
    dispatch(loadRestaurant());
    dispatch(createRestaurantProfile());
    window.location.href = "/";
  } catch (err) {
    console.log(err);
    console.log("Restaurant Registration failed");
    dispatch({
      type: REGISTER_RESTAURANT_FAILURE,
    });
  }
};

export const loginRestaurant = (email, password, type) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ email, password, type });
    const res = await axios.post("/api/auth", body, config);
    dispatch({
      type: RESTAURANT_LOGGED_IN,
      payload: res.data,
    });
    dispatch(loadRestaurant());
  } catch (err) {
    dispatch({
      type: RESTAURANT_LOGIN_ERROR,
    });
  }
};
export const logoutRestaurant = () => (dispatch) => {
  dispatch({ type: LOGOUT_RESTAURANT });
  window.location.href = "/";
};
