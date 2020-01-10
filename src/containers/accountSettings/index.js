import React, { useContext, useEffect, useState } from 'react'

import { GlobalState } from '../../state';

// Components
import {
  Typography, Container, Paper, List
} from '@material-ui/core';

import list from './SettingsList';
import ListItem from './ListItem'

import { useStyles } from './styles';

export default () => {
  const styles = useStyles();
  const { state, methods, constants, fb } = useContext(GlobalState);
  const { user, profileData, classes, activitiesQuery, history } = state;
  const { feedback, handleModals, updateProfileData } = methods;
  const { newUser } = constants;

  const [listOfSetting, setListOfSettings] = useState([]);
  const [listOfClicks, setListOfClicks] = useState([]);

  const checkActivePosts = () => {
    const posts = activitiesQuery.filter(post => post.uid === user.uid);
    if (posts.length > 0) {
      feedback('error', 'Please delete active posts first.');
      return false;
    }
    return true
  }
  const handleChangeAccount = async () => {
    if (profileData.type === 'Employer') {
      if (!checkActivePosts()) {
        return;
      }
    }
    let data = newUser(user);
    if (window.confirm('Are you sure?')) {
      if (profileData.type === 'Substitute') {
        await fb.remove_user_from_sub_db(user)
          .catch(error => {
            feedback('error', error);
          });
        fb.createProfileData(user, { ...data });
        history.push('/home/newUser');
        return;
      }
      fb.createProfileData(user, { ...data });
      history.push('/home/newUser');
    }
  }
  const handleDelete = async () => {
    if (profileData.type === 'Employer') {
      if (!checkActivePosts()) {
        return;
      }
    }
    if (window.confirm('Are you sure?')) {
      switch (profileData.type) {
        case 'Employer':
          await fb.remove_user_from_db(user)
            .catch(error => {
              feedback('error', error);
            });
          await fb.remove_user_from_auth(user)
            .catch(error => {
              feedback('logout', error);
            });
          break;
        default:
          await fb.remove_user_from_sub_db(user)
            .catch(error => {
              feedback('error', error);
            });
          await fb.remove_user_from_db(user)
            .catch(error => {
              feedback('error', error);
            });
          await fb.remove_user_from_auth(user)
            .catch(error => {
              feedback('logout', error);
            });
          break
      }
    }
  }
  const handleChangeEmail = () => {
    handleModals('ChangeEmail')
  }
  const handleChangePassword = () => {
    handleModals('ChangePassword')
  }
  const handleResendEmail = () => {
    if (user.emailVerified) {
      feedback('error', 'You are already verified');
      return;
    }
    if (!window.confirm('Resend verification email?')) {
      return;
    }
    fb.handleVerification(user);
  }
  const clearIgnoreList = () => {
    updateProfileData({ ignoreList: [] })
  }
  const clearBlockedUserList = () => {   
    handleModals('BlockedUsers')
  }

  // Slice 1st item from list for employer view
  let onClickMethods = [
    clearIgnoreList, clearBlockedUserList, handleChangeEmail,
    handleChangePassword, handleResendEmail,
    handleChangeAccount, handleDelete
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
    <Paper square={true} className={classes.root}>
      <Typography className={styles.header} componant='header' variant='h5' children={'Account Settings'} />
      <Container className={styles.container}>
        <List className={styles.list}>
          {listOfSetting.map((item, i) =>
            <ListItem key={i} props={{ i, item, listOfClicks, styles }} />
          )}
        </List>
      </Container>
    </Paper>
  )
}
