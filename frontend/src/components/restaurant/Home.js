import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
export const Home = (props) => {
  const profileImageStyle = {
    width: "100%",
    maxWidth: "100%",
    display: "block",
  };
  return (
    <div>
      {!props.isRestaurantProfileLoading && props.restaurantProfile === null ? (
        <Link to="/update-profile">Create Profile</Link>
      ) : (
        <>
          {props.restaurantProfile && (
            <>
              <p> Hi {props.restaurantProfile.restaurant.name}</p>
              {props.restaurantProfile.profileImage && (
                <img
                  style={profileImageStyle}
                  src={
                    "http://localhost:5000/profile-image/" +
                    props.restaurantProfile.profileImage.imageData
                      .split("\\")
                      .pop()
                  }
                  alt="profile"
                />
              )}
              <Link to="/update-profile">UpdateProfile</Link>
            </>
          )}
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isRestaurantProfileLoading: state.restaurantProfile.loading,
  restaurantProfile: state.restaurantProfile.profile,
});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
