import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import ActiveCoupons from "./ActiveCoupons";
import AddCoupons from "./AddCoupons";
import Home from "./Home";
import ExpiredCoupons from "./ExpiredCoupons";
import UpdateProfile from "./UpdateProfile";
const Views = () => {
  return (
    <div className="switch-router-wrapper">
      <Switch>
        <Route exact path="/" component={withRouter(Home)} />
        <Route exact path="/add-coupon" component={AddCoupons} />
        <Route exact path="/active-coupons" component={ActiveCoupons} />
        <Route exact path="/expired-coupons" component={ExpiredCoupons} />
        <Route exact path="/update-profile" component={UpdateProfile} />
      </Switch>
    </div>
  );
};

export default Views;
