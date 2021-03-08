import { combineReducers } from "redux";
import user from "./user";
import restaurant from "./restaurant";
import userProfile from "./userProfile";
import restaurantProfile from "./restaurantProfile";
export default combineReducers({
  user,
  restaurant,
  userProfile,
  restaurantProfile,
});
