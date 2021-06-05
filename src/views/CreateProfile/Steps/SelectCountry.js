import React, { useContext } from "react";
// State
import store from "state";
// Actions
import { handleProfileData } from "../../../actions/user";
// @material-ui/core components
import { Typography, Card, CardContent } from "@material-ui/core";
// Assets
import taiwanFlag from "assets/img/taiwan-flag.png";
import japanFlag from "assets/img/japan-flag.png";
// Styles
import { makeStyles } from "@material-ui/core/styles";
import { boxShadow, card, roseBoxShadow } from "assets/jss/material-kit-react";

const useStyles = makeStyles({
  card: {
    ...boxShadow,
    ...card,
    maxWidth: 500,
    width: "95%",
    background: "#ffffffb3",
    padding: "20px",
  },
  content: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  header: {
    paddingTop: 12,
  },
  flags: {
    ...boxShadow,
    width: 150,
    height: "auto",
    cursor: "pointer",
    "&:hover": {
      ...roseBoxShadow,
    },
  },
});

export default function SelectCountry() {
  const classes = useStyles();
  const { state, feedback, hist } = useContext(store);

  const selectCountry = (country) => () => {
    if (state.user.uid !== undefined) {
      handleProfileData({ action: "update", user: state.user, data: { country: country } })
        .then(() => hist.push("/createProfile-page/select-city"))
        .catch((err) => feedback("error", err));
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
        Choose your country
      </Typography>
      <CardContent className={classes.content}>
        <img
          src={taiwanFlag}
          alt="taiwan-flag"
          className={classes.flags}
          onClick={selectCountry("taiwan")}
        />
        <img
          src={japanFlag}
          alt="japan-flag"
          className={classes.flags}
          onClick={selectCountry("japan")}
        />
      </CardContent>
    </Card>
  );
}
