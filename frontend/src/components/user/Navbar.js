import React from "react";
import { connect } from "react-redux";
import { logoutUser } from "../../store/actions";
import { Link } from "react-router-dom";
export const Navbar = (props) => {
  const style = {
    position: "sticky",
    top: "0",
    zIndex: "100",
  };
  return (
    <div style={style}>
      <nav className="navbar navbar-dark bg-primary justify-content-center">
        <ul className="nav ">
          <Link to="/">
            <li className="nav-item c-ptr">
              <p className="nav-link text-light active" aria-current="page">
                Home
              </p>
            </li>
          </Link>
          <Link to="/explore">
            <li className="nav-item c-ptr">
              <p className="nav-link text-light">Explore</p>
            </li>
          </Link>
          <li className="nav-item c-ptr" onClick={props.logoutUser}>
            <p className="nav-link text-light">Logout</p>
          </li>
        </ul>
      </nav>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => dispatch(logoutUser()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
