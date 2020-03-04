import React, { useContext, useEffect, useState } from "react";
// Store
import store from 'state';
// @material-ui/core components
import { makeStyles, Typography, Container, List } from "@material-ui/core";
// custom components
import list from './SettingsList';
import ListItem from './ListItem'
// core components
import Header from "components/Header/Header.js";
// Menu Links
import HeaderLinks from "components/Header/HeaderLinks.js";
// Styles
import {
  body, bodyContainer, primaryGradient,
  defaultFont, boxShadow
} from "assets/jss/material-kit-react";

const useStyles = makeStyles(theme => ({
  header: {
    ...boxShadow,
    ...defaultFont,
    ...primaryGradient,
    marginTop: '-20px',
    padding: '8px 0px',
    textAlign: 'center',
    width: '60%',
    color: 'white'
  },
  container: {
    ...boxShadow,
    backgroundColor: '#f1f1f1',
    [theme.breakpoints.down('sm')]: {
      padding: 0
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 30
  },
  list: {
    marginBottom: 20,
    [theme.breakpoints.down('sm')]: {
      padding: 0
    }
  },
  listItem: {
    padding: '5px 5px 5px 12px'
  },
  root: {
    width: '100%',
    maxWidth: 650,
    marginTop: 5
  },
  body: {
    ...body
  }
}));


export default () => {
  const { state, methods, fb } = useContext(store);
  const classes = useStyles();
  const { user, profileData, noticeboardQuery } = state;
  const { feedback, handleModals, updateProfileData, 
    deleteUser, isUserSignedIn } = methods;

  const [listOfSetting, setListOfSettings] = useState([]);
  const [listOfClicks, setListOfClicks] = useState([]);

  const checkActivePosts = () => {
    const posts = noticeboardQuery.filter(post => post.uid === profileData.uid);
    if (posts.length > 0) {
      feedback('error', 'Please delete active posts first.');
      return false;
    }
    return true
  }
  const handleDelete = async () => {
    if (!isUserSignedIn()) {
      return;
    }
    if (profileData.type === 'Employer') {
      if (!checkActivePosts()) {
        return;
      }
    }
    if (window.confirm('Are you sure?')) {
      deleteUser();
    }
  }
  const handleChangeEmail = () => {
    if (!isUserSignedIn()) {
      return;
    }
    handleModals('ChangeEmail', true)
  }
  const handleChangePassword = () => {
    if (!isUserSignedIn()) {
      return;
    }
    handleModals('ChangePassword', true)
  }
  const clearBlockedUserList = () => {
    if (!isUserSignedIn()) {
      return;
    }
    handleModals('BlockedUsers', true)
  }
  const handleResendEmail = () => {
    if (!isUserSignedIn()) {
      return;
    }
    if (user.emailVerified) {
      feedback('error', 'You are already verified');
      return;
    }
    if (!window.confirm('Resend verification email?')) {
      return;
    }
    fb.handleVerification(user, feedback);
    updateProfileData({ emailSent: true })
  }
  const clearIgnoreList = () => {
    if (!isUserSignedIn()) {
      return;
  }
    updateProfileData({ ignoreList: [] })
      .then(() => {
        feedback('success', 'List cleared')
      })
      .catch((err) => {
        feedback('error', err)
      })
  }


  // Slice 1st item from list for employer view
  let onClickMethods = [
    clearIgnoreList, clearBlockedUserList, handleChangeEmail,
    handleChangePassword, handleResendEmail, handleDelete
  ];

  useEffect(() => {
    if (profileData.type === 'Employer') {
      setListOfSettings(list.slice(1))
      setListOfClicks(onClickMethods.slice(1))
      return;
    }
    setListOfSettings(list)
    setListOfClicks(onClickMethods)
    // eslint-disable-next-line
  }, [profileData])
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
          <Container className={classes.container}>
            <Typography className={classes.header}
              componant='header'
              variant='h5'
              children={'Account Settings'} />
            <List className={classes.list}>
              {listOfSetting.map((item, i) =>
                <ListItem key={i} props={{ i, item, listOfClicks, classes }} />
              )}
            </List>
          </Container>
        </div>
      </div>
    </div>
  );
}
