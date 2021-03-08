import React, { useState } from "react";
import Login from "../Login";
import Register from "../Register";
export default function LandingPage() {
  const [tab, setTab] = useState(1);
  return (
    <div className="w-100 h-screen d-flex flex-column justify-content-center align-items-center">
      <div className="d-flex ">
        <p
          className={(tab === 1 ? "active-tab" : "tab") + " mr-3"}
          onClick={() => setTab(1)}
        >
          Login
        </p>
        <p
          className={tab === 2 ? "active-tab" : "tab"}
          onClick={() => setTab(2)}
        >
          Register
        </p>
      </div>
      {tab === 1 ? <Login type="User" /> : <Register type="User" />}
    </div>
  );
}
