import React, { useContext, useEffect, useState } from 'react'

import GlobalState from '../../state/store';

// Components
import {
  Typography, Container, Paper, List
} from '@material-ui/core';

import list from './SettingsList';
import ListItem from './ListItem'

import { useStyles } from './styles';

export default () => {
  const styles = useStyles();
  const { state, methods, fb } = useContext(GlobalState);
  const { user, profileData, noticeboardQuery } = state;
  const { feedback, handleModals, updateProfileData, deleteUser } = methods;

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
    handleModals('ChangeEmail', true)
  }
  const handleChangePassword = () => {
    handleModals('ChangePassword', true)
  }
  const clearBlockedUserList = () => {
    handleModals('BlockedUsers', true)
  }
  const handleResendEmail = () => {
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
    updateProfileData({ ignoreList: [] })
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

  return (profileData &&
    <Paper square={true} className={styles.root}>
      <Container className={styles.container}>
        <Typography className={styles.header}
          componant='header'
          variant='h5'
          children={'Account Settings'} />
        <List className={styles.list}>
          {listOfSetting.map((item, i) =>
            <ListItem key={i} props={{ i, item, listOfClicks, styles }} />
          )}
        </List>
      </Container>
    </Paper>
  )
}
