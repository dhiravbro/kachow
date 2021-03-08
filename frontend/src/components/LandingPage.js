import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
const LandingPage = (props) => {
  if (props.isUserAuthenticated) {
    return <Redirect to="/" />;
  }
  if (props.isRestaurantAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <div className="welcome-container">
      <div className="p-5 rounded">
        <h1 className="welcome-heading text-center">Welcome to Kachow !</h1>
        <div className="py-5">
          <Link to="/restaurant" className="mr-3">
            <Button variant="primary">We are a restaurant </Button>
          </Link>
          <Link to="/consumer">
            <Button variant="light">
              I am a user, here to explore great deals
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isUserAuthenticated: state.user.isAuthenticated,
    isRestaurantAuthenticated: state.restaurant.isAuthenticated,
  };
};

export default connect(mapStateToProps, null)(LandingPage);
