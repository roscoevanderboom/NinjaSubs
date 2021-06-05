import React, { useContext } from "react";
// State
import store from "state";
// Actions
import { deleteProfile } from "actions/auth";
import { handleProfileData } from "actions/user";
// Constants
import { basicProfileData } from "constants/userProfiles";
// @material-ui/core components
import { Typography, Card, CardContent } from "@material-ui/core";
import Button from "components/CustomButtons/Button";
import { makeStyles } from "@material-ui/core/styles";
import { boxShadow, card } from "assets/jss/material-kit-react";

const useStyles = makeStyles({
  card: {
    ...boxShadow,
    ...card,
    maxWidth: 350,
    width: "95%",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    paddingTop: 12,
  },
});

export default function DeleteProfile() {
  const classes = useStyles();
  const { state, feedback, dispatch } = useContext(store);
  const { user, profileData } = state;

  const restart = () => {
    handleProfileData({
      action: "set",
      user,
      data: basicProfileData(user),
    }).catch((err) => feedback("error", err));
  };

  const handleDelete = () => {
    deleteProfile(user, profileData, feedback, dispatch);
  };

  return (
    <Card className={classes.card}>
      <Typography
        component="header"
        variant="h4"
        className={classes.header}
        align="center"
      >
        Choose your action
      </Typography>
      <CardContent className={classes.content}>
        <Button color="github" size="lg" onClick={restart}>
          Restart profile
        </Button>

        <Typography variant="subtitle1" className="p-2" align="center">
          or
        </Typography>
        <Button color="danger" size="lg" onClick={handleDelete}>
          Delete profile
        </Button>
      </CardContent>
    </Card>
  );
}
