import React, { useContext } from "react";
// Store
import store from "state";
// @material-ui/core components
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";
import { AccountBox, Mail } from "@material-ui/icons";
// Styles
import useStyles from "../styles";

export default function ProfileDetails() {

  const { state } = useContext(store);
  const { user, profileData } = state;

  const classes = useStyles();

  return (
    <>
      <Typography className={classes.detailsTitle} align="center" variant="h6">
        Profile details
      </Typography>
      <div className="w-100 pb-3">
        <List>
          <ListItem>
            <ListItemIcon>
              <AccountBox />
            </ListItemIcon>
            <ListItemText primary={user && user.displayName} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Mail />
            </ListItemIcon>
            <ListItemText primary={profileData && profileData.email} />
          </ListItem>
        </List>
      </div>
    </>
  );
}
