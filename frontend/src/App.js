import React, { useEffect } from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store/index.js";
import Kachow from "./Kachow";
import { loadApp } from "./store/actions/index";
import setAuthToken from "./utils/setAuthToken";
import { BrowserRouter as Router } from "react-router-dom";
if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => {
  useEffect(() => {
    store.dispatch(loadApp());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Kachow />
      </Router>
    </Provider>
  );
};

export default App;
