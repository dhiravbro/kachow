import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  registerRestaurant,
  registerUser,
} from "../../src/store/actions/index";
const Register = (props) => {
  const [registerFormState, setRegisterFormState] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    address: "",
  });
  const { name, email, password, password2, address } = registerFormState;
  const onChange = (e) => {
    setRegisterFormState((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      console.log("password don't match");
    } else {
      if (props.type === "Restaurant") {
        props.onRegisterRestaurant({ name, email, address, password });
      }
      if (props.type === "User") {
        props.onRegisterUser({ name, email, password });
      }
    }
  };
  if (props.isUserAuthenticated) {
    return <Redirect to="/" />;
  }
  if (props.isRestaurantAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <div className="d-flex flex-column justify-content-center align-items-center ">
      <p className="h2  mb-4">{props.type} Registration</p>

      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <label for="exampleInputEmail1">{props.type} Name</label>
          <input
            type="text"
            className="form-control"
            aria-describedby={props.type + "Name"}
            value={name}
            onChange={onChange}
            name="name"
          />
        </div>
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
            value={password}
            onChange={onChange}
            name="password"
          />
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            value={password2}
            onChange={onChange}
            name="password2"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Sign up
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
    onRegisterRestaurant: ({ name, email, address, password }) =>
      dispatch(registerRestaurant({ name, email, address, password })),
    onRegisterUser: ({ name, email, password }) =>
      dispatch(registerUser({ name, email, password })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
