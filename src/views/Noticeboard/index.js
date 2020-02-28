import React, { useContext, useEffect, useState } from "react";
// Store
import store from 'state';
// @material-ui/core components
import { makeStyles, Typography } from "@material-ui/core";
// Custom components
import Card from 'components/NoticeboardCard/Card';
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
  const { profileData, noticeboardQuery, searchList } = state;
  const classes = useStyles();
  const [list, setList] = useState([])

  useEffect(() => {
    if (profileData && noticeboardQuery) {
      profileData.type === 'Substitute'
        ? setList(filters.filterNoticeboard('sub', noticeboardQuery, profileData))
        : setList(filters.filterNoticeboard('emp', noticeboardQuery, profileData))
    }
    // eslint-disable-next-line
  }, [noticeboardQuery, profileData])

  // useEffect(() => {
  //   if (noticeboardQuery) {
  //     setList(noticeboardQuery);
  //   }
  // }, [noticeboardQuery])

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
          {list.length > 0 ? null :
            <ListHeader text='No positions available' />
          }
          {list.map((post, i) => <Card key={i} post={post} />)}
        </div>
      </div>
    </div>
  );
}
