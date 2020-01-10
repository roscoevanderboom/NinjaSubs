import React, { useContext, useEffect } from 'react';
import { GlobalState } from './state';
import { useHistory } from 'react-router-dom';

// Components
import Loader from './containers/components/loader';
import Login from './containers/login';
import Home from './containers/home';

import CssBaseline from '@material-ui/core/CssBaseline';

export default function App() {
  const routerHistory = useHistory();
  const { state, methods } = useContext(GlobalState);
  const { user, profileData } = state;
  const { handleAuthState, setHistory, checkStars,
    queryActivities, handleInbox, queryNoticeboard,
    handleProfileData, handleAvailableSubs
  } = methods;

  const getSubData = () => {
    handleAvailableSubs()
    queryNoticeboard();
    queryActivities();
    handleInbox();
  }
  const getEmpData = () => {
    handleAvailableSubs()
    queryActivities();
    handleInbox();
  }

  useEffect(() => {
    handleAuthState();
    // eslint-disable-next-line   
  }, [])

  useEffect(() => {
    if (user !== null) {
      handleProfileData(user.uid)
    }
    // eslint-disable-next-line
  }, [user])

  useEffect(() => {
    if (profileData.type !== undefined) {
      checkStars();
      profileData.type === 'Substitute'
        ? getSubData()
        : getEmpData()
    }
    // eslint-disable-next-line
  }, [profileData]);

  useEffect(() => {
    setHistory(routerHistory);
    // eslint-disable-next-line   
  }, [routerHistory])

  return (
    <React.Fragment>
      <CssBaseline />
      <Loader />
      {user === null ? <Login /> : <Home />}
    </React.Fragment>
  );
}
