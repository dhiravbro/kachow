import React from "react";
import { connect } from "react-redux";
import moment from "moment";

export const ActiveCoupons = (props) => {
  return (
    <div>
      {!props.loading && props.restaurantProfile === null ? (
        <p>Loading</p>
      ) : (
        <p>
          {props.restaurantProfile &&
            props.restaurantProfile.coupons.map((coupon) => {
              return (
                <>
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
                      </div>
                    </div>
                  )}
                </>
              );
            })}
        </p>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  restaurantProfile: state.restaurantProfile.profile,
  loading: state.restaurantProfile.loading,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ActiveCoupons);
