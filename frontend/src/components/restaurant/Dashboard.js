import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { loadRestaurantProfile } from "../../store/actions/restaurant";

// import { Switch, Route } from "react-router-dom";
import Views from "./Views";
export const Dashboard = (props) => {
  useEffect(() => {
    props.loadRestaurantProfile();
  }, []);
  return (
    <div className="w-50 h-screen">
      <Navbar />
      <div className="views-wrapper">
        <Views />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  return {
    loadRestaurantProfile: () => dispatch(loadRestaurantProfile()),
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Dashboard)
);
