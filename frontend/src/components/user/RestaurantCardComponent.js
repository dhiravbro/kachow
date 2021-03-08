import React, { useState, Fragment } from "react";
import Modal from "../utils/Modal";
import { connect } from "react-redux";
import moment from "moment";
import { buyCoupon } from "../../store/actions/index";
const RestaurantCardComponent = (props) => {
  const [showCoupons, setShowCoupons] = useState(false);
  const modalStyle = {
    position: "fixed",
    zIndex: "1000",
    top: "25%",
    left: "25%",
    height: "50%",
    width: "50%",
    backgroundColor: "white",
  };
  return (
    <Fragment>
      <div className="card w-100">
        {props.restaurantProfileImage ? (
          <img
            src={
              "http://localhost:5000/profile-image/" +
              props.restaurantProfileImage.imageData.split("\\").pop()
            }
            className="card-img-top "
            alt="..."
          />
        ) : (
          <h3 className="text-center py-3">No profile Image to show</h3>
        )}
        <div className="card-body">
          <h5 className="card-title">{props.restaurantName}</h5>
          <p className="card-text">Address : {props.address}</p>
          <p className="card-text">{props.description}</p>
          <a
            href="#!"
            className="btn btn-primary"
            onClick={() => setShowCoupons(true)}
          >
            View Coupons
          </a>
          <Modal show={showCoupons} modalClosed={() => setShowCoupons(false)}>
            <div
              classNameName="show-coupons-modal overflow-auto"
              style={modalStyle}
            >
              {props.coupons.map((coupon) => {
                return (
                  <div>
                    {moment().isBefore(coupon.expiryDate) && (
                      <div classNameName="card">
                        <div classNameName="card-body">
                          <p>Coupon Price : {coupon.price}</p>
                          <p>
                            Expiry Date :{" "}
                            {moment(coupon.expiryDate).format("LLL")}
                          </p>
                          <p>Quantity Left : {coupon.quantity}</p>
                          {coupon.couponType === 1 ? (
                            <p>Discount : {coupon.discount} %</p>
                          ) : (
                            <p>Food Worth : ₹{coupon.couponBalance}</p>
                          )}
                          <a
                            href="#!"
                            classNameName="btn btn-danger"
                            onClick={() => {
                              console.log(props.coupons);
                              props.buyCoupon({
                                restaurantName: props.restaurantName,
                                couponId: coupon._id,
                                restaurantId: props.restaurantId,
                              });
                            }}
                          >
                            Buy Coupon{" "}
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </Modal>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {
    buyCoupon: ({ restaurantId, couponId, restaurantName }) =>
      dispatch(buyCoupon({ restaurantId, couponId, restaurantName })),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantCardComponent);
