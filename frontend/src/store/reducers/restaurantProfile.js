import {
  LOAD_RESTAURANT_PROFILE,
  ADD_COUPON,
  UPDATE_RESTAURANT_PROFILE,
  LOAD_RESTAURANT_PROFILE_ERROR,
  CREATE_RESTAURANT_PROFILE,
  CREATE_RESTAURANT_PROFILE_ERROR,
} from "../actions";

const initialState = {
  profile: null,
  loading: true,
};
const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_RESTAURANT_PROFILE:
    case CREATE_RESTAURANT_PROFILE:
      return {
        ...state,
        profile: {
          ...state.profile,
          ...payload,
        },
      };
    case LOAD_RESTAURANT_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case LOAD_RESTAURANT_PROFILE_ERROR:
      return {
        ...state,
        profile: null,
        loading: false,
      };
    case CREATE_RESTAURANT_PROFILE_ERROR:
    default:
      return state;
  }
};
export default reducer;
