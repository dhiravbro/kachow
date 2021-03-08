import {
  REGISTER_USER_FAILURE,
  AUTH_ERROR,
  USER_LOGIN_ERROR,
  REGISTER_USER_SUCCESS,
  USER_LOADED,
  USER_LOGGED_IN,
  LOGOUT_USER,
} from "./types";
import axios from "axios";
import setAuthToken from "../../../src/utils/setAuthToken";
import { createUserProfile } from "./user";

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("/api/auth");
    dispatch({
      type: USER_LOADED,
      payload: { ...res.data, token: localStorage.token },
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const registerUser = ({ name, email, password }) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ name, email, password });
    const res = await axios.post("/api/users", body, config);
    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
    dispatch(createUserProfile());
    window.location.href = "/";
  } catch (err) {
    console.log("User Registration failed");
    dispatch({
      type: REGISTER_USER_FAILURE,
    });
  }
};

export const loginUser = (email, password, type) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ email, password, type });
    const res = await axios.post("/api/auth", body, config);
    dispatch({
      type: USER_LOGGED_IN,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    console.log(err);
    dispatch({
      type: USER_LOGIN_ERROR,
    });
  }
};

export const logoutUser = () => (dispatch) => {
  dispatch({ type: LOGOUT_USER });
  window.location.href = "/";
};
