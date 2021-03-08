import React from "react";
import RestaurantDashboard from "./components/restaurant/Dashboard";
import UserDashboard from "./components/user/Dashboard";
import Restaurant from "./components/restaurant/LandingPage";
import User from "./components/user/LandingPage";
import LandingPage from "./components/LandingPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect, useSelector } from "react-redux";

const Kachow = (props) => {
  let callContainer = null;
  const isUserAuthenticated = useSelector(
    (state) => state.user.isAuthenticated
  );

  const isRestaurantAuthenticated = useSelector(
    (state) => state.restaurant.isAuthenticated
  );

  if (isUserAuthenticated) {
    callContainer = <Route path="/" component={UserDashboard} />;
  } else if (isRestaurantAuthenticated) {
    callContainer = <Route path="/" component={RestaurantDashboard} />;
  } else {
    callContainer = (
      <Route path="/">
        <LandingPage />
      </Route>
    );
  }
  return (
    <div className="d-flex justify-content-center align-items-center w-100 h-screen overflow-auto">
      <Router>
        <Switch>
          <Route exact path="/restaurant" component={Restaurant} />
          <Route exact path="/consumer" component={User} />
          {/* <PrivateRoute
            exact
            type="User"
            path="/userdashboard"
            component={UserDashboard}
          />
          <PrivateRoute
            exact
            type="Restaurant"
            path="/restaurantdashboard"
            component={RestaurantDashboard}
          /> */}
          {callContainer}
        </Switch>
      </Router>
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Kachow);
