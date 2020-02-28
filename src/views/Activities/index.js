import React, { useContext }  from "react";
// Store
import store from 'state';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Header from "components/Header/Header.js";
// Menu Links
import HeaderLinks from "components/Header/HeaderLinks.js";
// Custom components
import SubActivities from './SubActivities';
import EmpActivities from './EmpActivities';
// Styles
import { body, bodyContainer } from "assets/jss/material-kit-react";
const useStyles = makeStyles({
  body: {
    ...body
  }
});

export default () => {
  const classes = useStyles();
  const { state } = useContext(store);
  const { profileData } = state;

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
          {profileData.type === 'Employer'
            ? <EmpActivities />
            : <SubActivities />
          }
        </div>
      </div>
    </div>
  );
}
