import React, { Fragment } from "react";
import MyBackdrop from "./Backdrop";
export default function Modal(props) {
  return (
    <Fragment>
      <MyBackdrop show={props.show} clicked={props.modalClosed} />
      {props.show ? props.children : null}
    </Fragment>
  );
}
