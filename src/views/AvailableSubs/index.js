import React, { useContext, useEffect, useState } from "react";
// Store
import store from "state";
// Constants
import { filterAvailableSubs } from "../../constants/filters";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// Custom components
import Card from "components/AvailableSubcard/SubCard";
import ListHeader from "components/EmptyListHeader";
// core components
import Header from "components/Header/Header.js";
// Menu Links
import HeaderLinks from "components/Header/HeaderLinks.js";
// Styles
import { body, bodyContainer } from "assets/jss/material-kit-react";
const useStyles = makeStyles({
  body: {
    ...body,
  },
});

export default function AvailableSubs() {
  const { state } = useContext(store);
  const { profileData, availableSubs } = state;
  const classes = useStyles();
  const [list, setList] = useState([]);

  useEffect(() => {
    if (profileData && availableSubs) {
      setList(filterAvailableSubs(availableSubs, profileData));
    }
    // eslint-disable-next-line
  }, [availableSubs, profileData]);

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
          {list.length > 0 ? null : <ListHeader text="No subs available" />}
          {list.map((sub, i) => (
            <Card key={i} sub={sub} />
          ))}
        </div>
      </div>
    </div>
  );
}
