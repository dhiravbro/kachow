import React, { useState, Fragment } from "react";
import Modal from "../utils/Modal";
import { connect } from "react-redux";
import moment from "moment";
import { buyCoupon } from "../../store/actions/index";
import StarsRating from "stars-rating";
import { giveRating } from "../../store/actions/user";
const RestaurantCardComponent = (props) => {
  const [showCoupons, setShowCoupons] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [rating, setRating] = useState(0);
  const ratingChanged = (newRating) => {
    console.log(newRating);
    setRating(newRating);
  };
  const modalStyle = {
    position: "fixed",
    zIndex: "1000",
    top: "25%",
    left: "25%",
    height: "50%",
    maxHeight: "50%",
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
          <p>
            <StarsRating
              count={5}
              size={24}
              value={props.restaurantRating}
              color2={"#ffd700"}
              edit={false}
            />
            ({props.restaurantCustomersRated})
          </p>
          <p className="card-text">Address : {props.address}</p>
          <p className="card-text">{props.description}</p>
          <a
            href="#!"
            className="btn btn-primary"
            onClick={() => setShowCoupons(true)}
          >
            View Coupons
          </a>
          <a
            href="#!"
            className="btn btn-primary ml-3"
            onClick={() => setShowRatingModal(true)}
          >
            Rate Us
          </a>
          <Modal show={showCoupons} modalClosed={() => setShowCoupons(false)}>
            <div
              className="show-coupons-modal overflow-auto"
              style={modalStyle}
            >
              {props.coupons.map((coupon) => {
                return (
                  <div>
                    {moment().isBefore(coupon.expiryDate) && (
                      <div className="card">
                        <div className="card-body">
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
                            className="btn btn-danger"
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
          <Modal
            show={showRatingModal}
            modalClosed={() => setShowRatingModal(false)}
          >
            <div
              className="show-coupons-modal overflow-auto p-3 px-5"
              style={{
                ...modalStyle,
                height: "fit-content",
                width: "fit-content",
                top: "45%",
                left: "45%",
              }}
            >
              <StarsRating
                count={5}
                size={24}
                value={rating}
                onChange={ratingChanged}
                color2={"#ffd700"}
              />
              <button
                className="btn btn-primary my-3"
                onClick={() => {
                  props.giveRating({
                    restaurantId: props.restaurantId,
                    rating,
                  });
                  setShowRatingModal(false);
                }}
              >
                Give rating
              </button>
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
    giveRating: ({ restaurantId, rating }) =>
      dispatch(giveRating({ restaurantId, rating })),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantCardComponent);
