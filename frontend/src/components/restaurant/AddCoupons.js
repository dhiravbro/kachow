import React, { useState } from "react";
import { connect } from "react-redux";
import { addCoupon } from "../../store/actions/index";
const AddCoupons = (props) => {
  const [couponDetails, setCouponDetails] = useState({
    couponType: 1,
    expiryDate: "",
    price: 0,
    quantity: 0,
    discount: 0,
    couponBalance: 0,
  });
  const onChange = (e) => {
    console.log(e.target.name, e.target.value);
    setCouponDetails((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };
  return (
    <div>
      <div className="form-group">
        <label for="exampleInputEmail1">Coupon Type</label>
        <select
          class="form-select"
          value={couponDetails.couponType}
          onChange={onChange}
          name="couponType"
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
        </select>
      </div>

      {/* <div className="form-group">
        <label for="exampleInputEmail1">Issue Date</label>
        <input
          type="datetime-local"
          className="form-control"
          aria-describedby="issueDate"
          name="issueDate"
          value={couponDetails.address}
          onChange={onChange}
        />
      </div> */}
      <div className="form-group">
        <label for="exampleInputEmail1">Expiry Date</label>
        <input
          type="datetime-local"
          className="form-control"
          aria-describedby="expiryDate"
          name="expiryDate"
          value={couponDetails.address}
          onChange={onChange}
        />
      </div>
      <div className="form-group">
        <label for="exampleInputPassword1">Price</label>
        <input
          type="number"
          className="form-control"
          id="description"
          name="price"
          value={couponDetails.price}
          onChange={onChange}
          min="0"
        />
      </div>
      <div className="form-group">
        <label for="exampleInputPassword1">Quantity</label>
        <input
          type="number"
          className="form-control"
          id="quantity"
          name="quantity"
          value={couponDetails.quantity}
          onChange={onChange}
          min="0"
        />
      </div>
      {couponDetails.couponType == 1 ? (
        <div className="form-group">
          <label for="exampleInputPassword1">Discount in (%) </label>
          <input
            type="number"
            className="form-control"
            id="discount"
            name="discount"
            value={couponDetails.discount}
            onChange={onChange}
            min="0"
          />
        </div>
      ) : null}
      {couponDetails.couponType == 2 ? (
        <div className="form-group">
          <label for="exampleInputPassword1">Coupon Balance</label>
          <input
            type="number"
            className="form-control"
            id="couponBalance"
            name="couponBalance"
            value={couponDetails.couponBalance}
            onChange={onChange}
            min="0"
          />
        </div>
      ) : null}
      <button
        type="submit"
        className="btn btn-primary"
        onClick={() => {
          props.addCoupon({
            ...couponDetails,
          });
        }}
      >
        Add Coupon
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    restaurant: state.restaurant,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addCoupon: ({
      couponType,
      expiryDate,
      price,
      quantity,
      discount,
      couponBalance,
    }) =>
      dispatch(
        addCoupon({
          couponType,
          expiryDate,
          price,
          quantity,
          discount,
          couponBalance,
        })
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCoupons);
