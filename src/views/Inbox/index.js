import React, { useContext, useEffect, useState } from 'react';
// Store
import store from 'state';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// custom components
import ChatButton from './ChatButton';
import ListHeader from 'components/EmptyListHeader';
// core components
import Header from "components/Header/Header.js";
// Menu Links
import HeaderLinks from "components/Header/HeaderLinks.js";
// Styles
import { body, bodyContainer } from "assets/jss/material-kit-react";
const useStyles = makeStyles({
  body: {
    ...body
  }
});


export default () => {
  const { state, filters, setState } = useContext(store);
  const { inbox, profileData, searchList } = state;
  const [list, setList] = useState([])
  const classes = useStyles();

  useEffect(() => {
    if (profileData) {
      setList(filters.filterInbox(inbox, profileData));
    }
  }, [inbox])
  return (
    <div>
      <Header
        brand="NinjaSubs"
        rightLinks={<HeaderLinks />}
        fixed
        color="dark"
      />
      <div className={classes.body}>
        <div className='d-flex justify-content-around'>
          {list.length === 0
            ? <ListHeader text='No contacts' />
            : <React.Fragment>
              {list.map((chat, i) =>
                <ChatButton
                  key={i}
                  chat={chat} />
              )}
            </React.Fragment>
          }
        </div>
      </div>
    </div>
  );
}
