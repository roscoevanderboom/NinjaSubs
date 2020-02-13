import React, { useContext, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import routes from './routes/routes';
// State
import GlobalState from './state/store';

// Components
import AppNavBar from './components/AppNavBar/AppNavBar';
import LoginForm from './components/LoginForm/FormDialog';
import CreateNewUser from './components/createUserProfile/CreateNewUser';

// Dialogs
import ChangeAvatar from './views/profile/ChangeAvatar';
import CreatePost from './components/createPost/CreatePost';
import BlockedUsers from './views/settings/BlockedUsers';
import ChangeEmail from './views/settings/ChangeEmail';
import ChangePassword from './views/settings/ChangePassword';

// Loader 
import Loader from './components/Loader';

import { makeStyles } from '@material-ui/core';
const useStyles = makeStyles(theme => ({
  paper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#282c34',
    fontSize: `calc(10px + 2vmin)`,
    marginTop: 64,
    [theme.breakpoints.down('sm')]: {
      marginTop: 56
    }
  }
}));

export default function App() {
  const classes = useStyles();
  const { state, setState, methods, hist } = useContext(GlobalState);
  const { setProfileData, setNoticeboardQuery,
    setAvailableSubs, setInbox } = setState;

  const resetState = (arr) => {
    arr.map(setState => setState(false))
  }

  useEffect(() => {
    methods.handleAuthState()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (state.user === null) {
      methods.handleModals('LoginForm', true);
      resetState([
        setProfileData, setNoticeboardQuery,
        setAvailableSubs, setInbox
      ])
      return;
    }
    methods.handleModals('LoginForm', false);
    // eslint-disable-next-line
  }, [state.user])

  useEffect(() => {
    if (state.user !== false && state.user !== null) {
      methods.handleProfileData();
      methods.queryNoticeboard();
      methods.queryAvailableSubs();
      methods.handleInbox();
    }
    // eslint-disable-next-line
  }, [state.user])
  useEffect(() => {
    if (state.createUserProfile) {
      hist.push('/newUser')
    }
    // eslint-disable-next-line
  }, [state.createUserProfile]) 

  return (
    <React.Fragment>
      <Loader />
      <AppNavBar />
      <div
        className={classes.paper}>
        <Switch>
          {routes.map((route) =>
            <Route key={route.path} path={route.path} component={route.component} />
          )}
        </Switch>
      </div>
      <Route path='/login' component={LoginForm} />
      <Route path='/newUser' component={CreateNewUser} />

      {!state.user || state.user === null ? <Redirect to='/login' /> : <Redirect to='/home/activities' />}

      <ChangeAvatar />
      <CreatePost />
      <BlockedUsers />
      <ChangeEmail />
      <ChangePassword />
    </React.Fragment>
  );
}