import React, { useState } from "react";
import { connect } from "react-redux";
import { loginRestaurant, loginUser } from "../../src/store/actions/index";
import { Redirect } from "react-router-dom";
const Register = (props) => {
  const [loginFormState, setLoginFormState] = useState({
    email: "",
    password: "",
  });
  const { email, password } = loginFormState;
  const onChange = (e) => {
    setLoginFormState((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (props.type === "User") {
      props.loginUser(email, password, props.type);
    }
    if (props.type === "Restaurant") {
      props.loginRestaurant(email, password, props.type);
    }
    console.log("you have entered an email and password");
  };
  if (props.isUserAuthenticated) {
    return <Redirect to="/" />;
  }
  if (props.isRestaurantAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <div className="d-flex flex-column justify-content-center align-items-center ">
      <p className="h2 mb-4">{props.type} Login</p>

      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <label for="exampleInputEmail1">Email </label>
          <input
            type="email"
            className="form-control"
            aria-describedby="emailHelp"
            value={email}
            onChange={onChange}
            name="email"
          />
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={password}
            onChange={onChange}
            name="password"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    isUserAuthenticated: state.user.isAuthenticated,
    isRestaurantAuthenticated: state.restaurant.isAuthenticated,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    loginRestaurant: (email, password, type) =>
      dispatch(loginRestaurant(email, password, type)),
    loginUser: (email, password, type) =>
      dispatch(loginUser(email, password, type)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Register);
