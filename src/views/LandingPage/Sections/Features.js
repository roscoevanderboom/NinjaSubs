import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

// @material-ui/icons
import Chat from "@material-ui/icons/Chat";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import Fingerprint from "@material-ui/icons/Fingerprint";
// Custom components
import International from "./International";

import {
  primaryColor,
  dangerColor,
  warningColor
} from "assets/jss/material-kit-react.js";

const icon = {
  width: "80px",
  height: "80px"
};

const useStyles = makeStyles({
  verifiedIcon: {
    ...icon,
    color: dangerColor
  },
  chatIcon: {
    ...icon,
    color: primaryColor
  },
  contentIcon: {
    ...icon,
    color: warningColor
  },
  description: {
    overflow: "hidden",
    marginTop: "0px",
    fontSize: "14px",
    padding: "0px 12px"
  },
  descriptionWrapper: {
    overflow: "hidden"
  }
});

const Features = () => {
  const classes = useStyles();
  return (
    <div className="row m-0 p-0">
      <div className="col-12 text-center">
        <International />
        <div className="pt-3">
          <Chat className={classes.chatIcon} />
        </div>
        <div className={classes.descriptionWrapper}>
          <Typography component="header" variant="h5">
            Private Chat
          </Typography>
          <p className={classes.description}>
            Chat messages are protected by strict security rules created for
            Google Firebase Cloud Firestore
          </p>
        </div>

        <div className="pt-3">
          <VerifiedUser className={classes.verifiedIcon} />
        </div>
        <div className={classes.descriptionWrapper}>
          <Typography component="header" variant="h5">
            Verified Users
          </Typography>
          <p className={classes.description}>
            Only verified users can create content. Email verification will be
            sent to a new user within a minute ( connetion depending ) after
            registering.
          </p>
        </div>

        <div className="pt-3">
          <Fingerprint className={classes.contentIcon} />
        </div>
        <div className={classes.descriptionWrapper}>
          <Typography component="header" variant="h5">
            Content Filters
          </Typography>
          <p className={classes.description}>
            Both employers and subtitutes can filter noticeboards and personal
            activities lists in custom ways.
          </p>
        </div>
      </div>
    </div>
  );
};
export default Features;
