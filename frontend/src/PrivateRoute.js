import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, type, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (
          (!rest.isUserAuthenticated && !rest.isUserLoading) ||
          (!rest.isRestaurantAuthenticated && !rest.isRestaurantLoading)
        )
          return <Redirect to="/" />;
        if (
          type === "Restaurant" &&
          rest.isRestaurantAuthenticated &&
          !rest.isRestaurantLoading
        )
          return <Component {...props} />;
        if (type === "User" && rest.isUserAuthenticated && !rest.isUserLoading)
          return <Component {...props} />;
      }}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    isUserAuthenticated: state.user.isAuthenticated,
    isRestaurantAuthenticated: state.restaurant.isAuthenticated,
    isRestaurantLoading: state.restaurant.loading,
    isUserLoading: state.restaurant.loading,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
