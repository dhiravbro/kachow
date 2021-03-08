import React from "react";
import { Switch, Route } from "react-router-dom";
import Explore from "./Explore";
import Home from "./Home";
export default function Views() {
  return (
    <div>
      <Switch>
        <Route exact path="/explore" component={Explore} />
        <Route exact path="/" component={Home} />
      </Switch>
    </div>
  );
}
