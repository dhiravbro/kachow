import React, { useEffect } from "react";
import { connect } from "react-redux";
import Navbar from "./Navbar";
import { loadUserProfile } from "../../store/actions/index";
import Views from "./Views";
export const Dashboard = (props) => {
  useEffect(() => {
    console.log("useEffect user dashboard");
    props.loadUserProfile();
  }, []);
  console.log("user");
  return (
    <div className="w-50 h-screen">
      <Navbar />
      <Views />
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  return {
    loadUserProfile: () => dispatch(loadUserProfile()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
