import React, { useContext } from "react";
// Store
import store from 'state';
// @material-ui/core components
import { Typography, Container, List } from "@material-ui/core";
// custom components
import BlockedUsers from './BlockedUsers';
import ChangePassword from './ChangePassword';
import ClearIgnoredPosts from './ClearIgnoredPosts';
import ChangeEmail from './ChangeEmail';
import ResendVerification from './ResendVerification';
import DeleteAccount from './DeleteAccount';
// core components
import Header from "components/Header/Header.js";
// Menu Links
import HeaderLinks from "components/Header/HeaderLinks.js";
// Styles
import { bodyContainer } from "assets/jss/material-kit-react";
import useStyles from "./styles";

export default () => {
  const { state } = useContext(store);
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
            <Typography className={classes.header}
              componant='header'
              variant='h5'
              children={'Account Settings'} />
            <List className={classes.list}>
              {state.profileData.type === 'Employer' ? null :
                <ClearIgnoredPosts />}
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
}
