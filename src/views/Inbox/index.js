import React, { useContext, useEffect, useState } from "react";
// Store
import store from "state";
// Constants
import { filterInbox } from "../../constants/filters";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// custom components
import ChatButton from "./ChatButton";
import ListHeader from "components/EmptyListHeader";
// core components
import Header from "components/Header/Header.js";
// Menu Links
import HeaderLinks from "components/Header/HeaderLinks.js";
// Styles
import { body } from "assets/jss/material-kit-react";
const useStyles = makeStyles({
  body: {
    ...body,
  },
});

export default function Inbox() {
  const { state } = useContext(store);
  const { inbox, profileData } = state;
  const [list, setList] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    if (profileData && inbox) {
      setList(filterInbox(inbox, profileData));
    }
    // eslint-disable-next-line
  }, [inbox, profileData]);
  return (
    <div>
      <Header
        brand="NinjaSubs"
        rightLinks={<HeaderLinks />}
        fixed
        color="dark"
      />
      <div className={classes.body}>
        <div className="d-flex justify-content-around">
          {list.length === 0 ? (
            <ListHeader text="No active chats" />
          ) : (
            <React.Fragment>
              {list.map((chat, i) => (
                <ChatButton key={i} chat={chat} />
              ))}
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
}
