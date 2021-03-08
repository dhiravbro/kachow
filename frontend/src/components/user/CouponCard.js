import React, { useState } from "react";
import moment from "moment";
import Modal from "../utils/Modal";
import { connect } from "react-redux";
import { buyFood } from "../../store/actions/index";
const CouponCard = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [billAmount, setBillAmount] = useState(0);
  const modalStyle = {
    position: "fixed",
    zIndex: "1000",
    top: "25%",
    left: "25%",
    height: "50%",
    width: "50%",
    backgroundColor: "white",
  };
  const onChange = (e) => setBillAmount(e.target.value);
  return (
    <div className="card">
      <div className="card-body">
        <p className="card-title">{props.coupon.restaurantName}</p>
        <p>Coupon Price : {props.coupon.price}</p>
        <p>Expiry Date : {moment(props.coupon.expiryDate).format("LLL")}</p>
        {props.coupon.couponType === 1 ? (
          <p>Discount : {props.coupon.discount} %</p>
        ) : (
          <p>Food Worth : ₹{props.coupon.remainingCouponBalance}</p>
        )}
      </div>
      {props.coupon.couponType === 2 && (
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          Buy Food
        </button>
      )}
      <Modal show={showModal} modalClosed={() => setShowModal(false)}>
        <div
          className="show-coupons-modal overflow-auto p-5"
          style={modalStyle}
        >
          <div className="form-group">
            <label htmlFor="billAmount">Bill Amount</label>
            <input
              type="number"
              className="form-control"
              id="billAmount"
              name="billAmount"
              value={billAmount}
              onChange={onChange}
              min="0"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            onClick={() =>
              props.buyFood({ couponId: props.coupon._id, billAmount })
            }
          >
            Deduct Balance
          </button>
        </div>
      </Modal>
    </div>
  );
};
const mapStateToProps = (state) => {};
const mapDispatchToProps = (dispatch) => {
  return {
    buyFood: ({ couponId, billAmount }) =>
      dispatch(buyFood({ couponId, billAmount })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CouponCard);
