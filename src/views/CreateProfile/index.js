import React from "react";
import { Switch, Route } from "react-router-dom";

// Assets
import bg from "assets/img/bg.jpg";
// Styles
import { makeStyles } from "@material-ui/core/styles";
import { boxShadow, defaultFont } from "assets/jss/material-kit-react";
// Steps
import SelectPath from "./Steps/SelectPath";
import SelectCountry from "./Steps/SelectCountry";
import SelectCity from "./Steps/SelectCity";
import DeleteProfile from "./Steps/DeleteProfile";

const useStyles = makeStyles({
  container: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
    padding: 0,
    backgroundColor: "slategray",
    backgroundImage: `url('${bg}')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  footer: {
    ...boxShadow,
    ...defaultFont,
    fontWeight: "400",
    position: "fixed",
    bottom: 0,
    right: 0,
    padding: 12,
    backgroundColor: "#f0f8ff26",
    borderRadius: 8,
  },
});

export default function CreateProfile() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Switch>
        <Route
          path="/createProfile-page/select-country"
          render={() => <SelectCountry />}
        />
        <Route
          path="/createProfile-page/select-city"
          render={() => <SelectCity />}
        />
        <Route
          path="/createProfile-page/select-path"
          render={() => <SelectPath />}
        />
        <Route
          path="/createProfile-page/delete-profile"
          render={() => <DeleteProfile />}
        />
      </Switch>

      <div className={classes.footer}>
        Photo by{" "}
        <a
          href="https://unsplash.com/@alschim"
          className="text-light"
          target="_blank"
          rel="noopener noreferrer"
        >
          Alexander Schimmeck
        </a>{" "}
        on{" "}
        <a
          href="https://unsplash.com/"
          className="text-light"
          target="_blank"
          rel="noopener noreferrer"
        >
          Unsplash
        </a>
      </div>
    </div>
  );
}
