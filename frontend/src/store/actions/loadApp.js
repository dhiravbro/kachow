import { AUTH_ERROR, RESTAURANT_LOADED, USER_LOADED } from "./types";
import axios from "axios";
import setAuthToken from "../../../src/utils/setAuthToken";
export const loadApp = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("/api/auth");
    console.log(res.data);
    if (res.data.restaurant) {
      dispatch({
        type: RESTAURANT_LOADED,
        payload: { ...res.data, token: localStorage.token },
      });
    } else if (res.data.user) {
      dispatch({
        type: USER_LOADED,
        payload: { ...res.data, token: localStorage.token },
      });
    } else {
      dispatch({ type: AUTH_ERROR });
    }
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};
