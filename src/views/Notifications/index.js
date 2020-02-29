import React, { useContext } from "react";
// Store
import store from 'state';
// @material-ui/icons
import Check from "@material-ui/icons/Check";
import Warning from "@material-ui/icons/Warning";
// core components
import SnackbarContent from "components/Snackbar/SnackbarContent";
import Clearfix from "components/Clearfix/Clearfix";

export default function Notifications() {
  const { state } = useContext(store);
  const { notificationList } = state;

  return (
    <React.Fragment>
      {notificationList.map((item, i) => (
        <SnackbarContent key={i} {...item} />
      ))}
      <Clearfix />
    </React.Fragment>
  );
}
