import React from "react";
import PropTypes from "prop-types";
import { signOut } from "../../actions/auth";
// Components
import CustomButton from "../CustomButtons/Button";
import { Button } from "@material-ui/core";
import { Close, ExitToApp } from "@material-ui/icons";

export const DismissBtn = ({ key, closeSnackbar }) => {
  return (
    <Button
      onClick={() => {
        closeSnackbar(key);
      }}
    >
      <Close />
    </Button>
  );
};
DismissBtn.propTypes = {
  key: PropTypes.any,
  closeSnackbar: PropTypes.func,
};
export const AcceptBtn = ({ onClick }) => (
  <Button variant="outlined" onClick={onClick}>
    Accept
  </Button>
);
AcceptBtn.propTypes = {
  onClick: PropTypes.func,
};
export const LogoutBtn = ({ key, closeSnackbar, hist }) => (
  <Button
    onClick={() => {
      signOut(hist);
      closeSnackbar(key);
    }}
  >
    <ExitToApp />
  </Button>
);
LogoutBtn.propTypes = {
  key: PropTypes.any,
  closeSnackbar: PropTypes.func,
  hist: PropTypes.object,
};
export const CustomBtn = ({ text, onClick }) => (
  <Button variant="outlined" color="default" onClick={() => onClick}>
    {text}
  </Button>
);
CustomBtn.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
};
export const SubmitBtn = (props) => (
  <CustomButton size="sm" color="danger" onClick={props.onClick}>
    {props.children}
  </CustomButton>
);
SubmitBtn.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.string,
};
