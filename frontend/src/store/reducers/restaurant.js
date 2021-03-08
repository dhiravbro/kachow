import {
  AUTH_ERROR,
  LOGOUT_RESTAURANT,
  REGISTER_RESTAURANT_FAILURE,
  REGISTER_RESTAURANT_SUCCESS,
  RESTAURANT_LOADED,
  RESTAURANT_LOGGED_IN,
  RESTAURANT_LOGIN_ERROR,
} from "../actions/types";

const initialState = {
  isAuthenticated: false,
  token: localStorage.getItem("token"),
  loading: true,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    // case RESTAURANT_LOADED:
    //   return {
    //     ...state,
    //     restaurant: {
    //       ...state.restaurant,
    //       isAuthenticated: true,
    //       loading: false,
    //       user: payload,
    //     },
    //   };

    case REGISTER_RESTAURANT_SUCCESS:
    case RESTAURANT_LOGGED_IN:
    case RESTAURANT_LOADED:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload.restaurant,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_RESTAURANT_FAILURE:
    case AUTH_ERROR:
    case RESTAURANT_LOGIN_ERROR:
    case LOGOUT_RESTAURANT:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        loading: false,
      };
    default:
      return state;
  }
};
export default reducer;
