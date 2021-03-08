import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logoutRestaurant } from "../../store/actions";

export const Navbar = (props) => {
  return (
    <div>
      <nav className="navbar navbar-dark bg-primary justify-content-center align-items-center">
        <ul className="nav ">
          <Link to="/" className="d-flex align-items-center">
            <li className="nav-item c-ptr">
              <p className="nav-link text-light active" aria-current="page">
                Home
              </p>
            </li>
          </Link>
          <Link to="/active-coupons" className="d-flex align-items-center">
            <li className="nav-item c-ptr">
              <p className="nav-link text-light">Active Coupons</p>
            </li>
          </Link>
          <li className="nav-item c-ptr">
            <Link to="/expired-coupons" className="d-flex align-items-center">
              <li className="nav-item c-ptr">
                <p className="nav-link text-light">Expired Coupons</p>
              </li>
            </Link>
          </li>
          <Link to="/add-coupon" className="d-flex align-items-center">
            <li className="nav-item c-ptr">
              <p className="nav-link text-light">Add Coupon</p>
            </li>
          </Link>
          <li className="nav-item c-ptr" onClick={props.logoutRestaurant}>
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
    logoutRestaurant: () => dispatch(logoutRestaurant()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
