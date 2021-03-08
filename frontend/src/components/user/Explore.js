import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loadRestaurantList } from "../../store/actions/index";
import RestaurantCardComponent from "./RestaurantCardComponent";

export const Explore = (props) => {
  useEffect(() => {
    props.loadRestaurantList();
  }, []);
  return (
    <div>
      Here is the restaurant list
      {props.restaurantList &&
        props.restaurantList.map((restaurantProfile) => {
          const details = restaurantProfile.restaurant;
          return (
            <RestaurantCardComponent
              restaurantId={details._id}
              restaurantProfileImage={restaurantProfile.profileImage}
              address={restaurantProfile.address}
              restaurantName={details.name}
              coupons={restaurantProfile.coupons}
              description={restaurantProfile.description}
            />
          );
        })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    restaurantList: state.userProfile.restaurantProfiles,
  };
};

const mapDispatchToProps = (dispatch) => {
  return { loadRestaurantList: () => dispatch(loadRestaurantList()) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Explore);
