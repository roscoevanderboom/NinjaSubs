import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
// core components
import GridContainer from "components/Grid/GridContainer.js";
// Team images
import Asriel from "./TeamMembers/Asriel";
import Roscoe from "./TeamMembers/Roscoe";
import Bethany from "./TeamMembers/Bethany";
// Styles
import styles from "assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";
const useStyles = makeStyles(styles);

export default function TeamSection() {
  const classes = useStyles();

  return (
    <div className="col-12 text-center bg-light pt-2">
      <Typography className={classes.title} component="header" variant="h4">
        Meet our team
      </Typography>

      <GridContainer justify="space-evenly">
        <Roscoe />
        <Asriel />
        <Bethany />
      </GridContainer>
    </div>
  );
}
