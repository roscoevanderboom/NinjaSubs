import React, { useContext } from "react";
// Store
import store from "state";
// @material-ui/core components
import { Typography, Container, List } from "@material-ui/core";
// custom components
import BlockedUsers from "./BlockedUsers";
import ChangePassword from "./ChangePassword";
import ClearIgnoredPosts from "./ClearIgnoredPosts";
import ResendVerification from "./ResendVerification";
import DeleteAccount from "./DeleteAccount";
import ChangeDisplayName from "./ChangeDisplayName";
import ChangeEmail from "./ChangeEmail";
// core components
import Header from "components/Header/Header.js";
// Menu Links
import HeaderLinks from "components/Header/HeaderLinks.js";
// Styles
import { bodyContainer } from "assets/jss/material-kit-react";
import useStyles from "./styles";

const Settings = () => {
  const { state } = useContext(store);
  const { profileData } = state;
  const classes = useStyles();

  return (
    <div>
      <Header
        brand="NinjaSubs"
        rightLinks={<HeaderLinks />}
        fixed
        color="dark"
      />
      <div className={classes.body}>
        <div className={bodyContainer}>
          <Container className={classes.container}>
            <Typography
              className={classes.header}
              componant="header"
              variant="h5"
            >
              Account Settings
            </Typography>
            <List className={classes.list}>
              {profileData.type === "Employer" ? null : <ChangeDisplayName />}
              {profileData.type === "Employer" ? null : <ClearIgnoredPosts />}
              <ChangeEmail />
              <BlockedUsers />
              <ResendVerification />
              <ChangeEmail />
              <ChangePassword />
              <DeleteAccount />
            </List>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Settings;
