import { connect } from "react-redux";
import React, { useState } from "react";
import { addCashBalance } from "../../store/actions/index";
import CouponCard from "./CouponCard";
const Home = (props) => {
  const [balance, setBalance] = useState(0);
  const onChange = (e) => {
    setBalance(e.target.value);
  };
  return (
    <div>
      {props.userProfile === null && !props.loading ? (
        <p>Loading</p>
      ) : (
        <p className="my-5">
          Here is your cash balance : {props.userProfile.addedCash}{" "}
        </p>
      )}
      <div className="form-group">
        <label for="exampleInputEmail1">Amount </label>
        <input
          type="number"
          className="form-control"
          aria-describedby="cashBalance"
          name="balance"
          value={balance}
          onChange={onChange}
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary"
        onClick={() => props.addBalance(balance)}
      >
        Add Cash Balance
      </button>
      <p className="my-3">List of your valid coupons</p>
      {props.userProfile === null && !props.loading ? (
        <p>Loading</p>
      ) : (
        props.userProfile.coupons.map((coupon) => (
          <CouponCard coupon={coupon} />
        ))
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    loading: state.userProfile.loading,
    userProfile: state.userProfile.profile,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addBalance: (balance) => dispatch(addCashBalance(balance)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
