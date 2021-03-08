import {
  REGISTER_USER_FAILURE,
  AUTH_ERROR,
  USER_LOGIN_ERROR,
  REGISTER_USER_SUCCESS,
  USER_LOADED,
  USER_LOGGED_IN,
  SHOW_USER_COUPONS,
  LOGOUT_USER,
} from "../actions/types";

const initialState = {
  isAuthenticated: false,
  token: localStorage.getItem("token"),
  loading: true,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SHOW_USER_COUPONS:
      return {};
    case REGISTER_USER_FAILURE:
    case AUTH_ERROR:
    case USER_LOGIN_ERROR:
    case LOGOUT_USER:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        loading: false,
      };
    case REGISTER_USER_SUCCESS:
    case USER_LOADED:
    case USER_LOGGED_IN:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload.user,
        isAuthenticated: true,
        loading: false,
      };

    default:
      return state;
  }
};
export default reducer;
