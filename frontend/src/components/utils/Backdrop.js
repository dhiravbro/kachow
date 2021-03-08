import React, { Fragment } from "react";
export default function Backdrop(props) {
  return (
    <Fragment>
      {props.show ? <div className="backdrop" onClick={props.clicked} /> : null}
    </Fragment>
  );
}
