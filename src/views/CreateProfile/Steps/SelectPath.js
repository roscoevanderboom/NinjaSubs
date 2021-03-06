import React, { useContext } from "react";
// State
import store from "state";
// Constants
import { newEmployerData, newSubData } from "../../../constants/userProfiles";
// Actions
import { handleProfileData } from "../../../actions/user";
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

export default function SelectPath() {
  const classes = useStyles();
  const { state, feedback, hist } = useContext(store);

  const selectPath = (userPath) => () => {
    let data = {};
    userPath === "substitute"
      ? (data = newSubData(state.user))
      : (data = newEmployerData);

    if (state.user.uid !== undefined) {
      handleProfileData({ action: "update", user: state.user, data: data })
        .then(() => hist.push("/profile-page"))
        .catch((err) => feedback("error", err.message));
    }
  };

  return (
    <Card className={classes.card}>
      <Typography
        component="header"
        variant="h4"
        className={classes.header}
        align="center"
      >
        Choose your path
      </Typography>
      <CardContent className={classes.content}>
        <Button color="github" size="lg" onClick={selectPath("substitute")}>
          Substitute
        </Button>

        <Typography variant="subtitle1" className="p-2" align="center">
          or
        </Typography>
        <Button color="github" size="lg" onClick={selectPath("employer")}>
          Employer
        </Button>
      </CardContent>
    </Card>
  );
}
