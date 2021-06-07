import React, { useContext, useState } from "react";
// State
import store from "state";
// Constants
import { taiwan, japan } from "../../../constants/locations";
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
    maxWidth: 500,
    width: "95%",
    padding: 20,
  },
  content: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
  },
  header: {
    paddingTop: 12,
  },
});

export default function SelectCity() {
  const classes = useStyles();
  const { state, feedback, hist } = useContext(store);
  const [cities, setCities] = useState([]);
  const countries = { taiwan, japan };

  const selectCity = (city) => () => {
    if (state.user.uid !== undefined) {
      handleProfileData({
        action: "update",
        user: state.user,
        data: { city: city },
      })
        .then(() => hist.push("/createProfile-page/select-path"))
        .catch((err) => feedback("error", err.message));
    }
  };

  React.useEffect(() => {
    if (state.profileData !== null && state.profileData.country !== undefined) {
      let list = Object.keys(countries[`${state.profileData.country}`]);
      setCities(list);
    }
    // eslint-disable-next-line
  }, [state.profileData]);

  return (
    <Card className={classes.card}>
      <Typography
        component="header"
        variant="h4"
        className={classes.header}
        align="center"
      >
        Choose your city
      </Typography>
      <CardContent className={classes.content}>
        {cities.map((city, i) => (
          <Button key={i} color="github" size="lg" onClick={selectCity(city)}>
            {city}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}
