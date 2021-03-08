import {
  LOAD_RESTAURANT_LIST,
  LOAD_USER_PROFILE,
  LOAD_USER_PROFILE_ERROR,
  BUY_COUPON,
  ADD_BALANCE,
  LOAD_USER_ACTIVE_COUPONS,
  LOAD_USER_EXPIRED_COUPONS,
} from "../actions/index";

const initialState = {
  profile: null,
  restaurantProfiles: [],
  userProfileLoading: true,
  restaurantProfilesLoading: true,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_BALANCE:
      return {
        ...state,
        balance: state.balance + payload,
      };
    case BUY_COUPON:
      console.log(payload);
      return {
        ...state,
        profile: {
          ...state.profile,
        },
      };
    case LOAD_USER_ACTIVE_COUPONS:
    case LOAD_USER_EXPIRED_COUPONS:
      return {
        ...state,
        coupons: [...payload],
      };
    case LOAD_USER_PROFILE:
      return {
        ...state,
        profile: payload,
        userProfileLoading: false,
      };
    case LOAD_RESTAURANT_LIST:
      return {
        ...state,
        restaurantProfiles: [...payload],
        restaurantProfilesLoading: false,
      };
    case LOAD_USER_PROFILE_ERROR:
      return {
        ...state,
        userProfileLoading: false,
      };
    default:
      return state;
  }
};

export default reducer;
