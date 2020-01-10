import React, { useState, useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import { GlobalState } from '../../state';

// Navigation
import TopNav from '../navigation/TopNav';
import SideMenu from '../navigation/SideMenu';

// Modals
import CandidateCard from '../components/candidateCard';
import ChangeAvatar from '../profile/ChangeAvatar';
import UpdateUserInfo from '../profile/UpdateUserInfo';
import ChangeEmail from '../accountSettings/ChangeEmail';
import ChangePassword from '../accountSettings/ChangePassword';
import CreatePost from '../components/createPost';
import BlockedUsers from '../accountSettings/BlockedUsers';

import { useStyles } from './styles';

export default () => {
  const classes = useStyles();
  const { state } = useContext(GlobalState);
  const { user, routes } = state;
  const [open, setOpen] = useState(false);

  const handleDrawer = () => {
    setOpen(open ? false : true);
  };

  // React.useEffect(() => {
  //   console.log(modals)
  // }, [modals])

  return (user &&
    <React.Fragment>
      <div>
        <TopNav open={open} handleDrawer={handleDrawer} classes={classes} />
        <SideMenu props={{ open, state, handleDrawer }} />
        <main className={classes.content}>
          <Switch>
            {routes.map((route, key) =>
              <Route key={key} path={route.path} component={route.component} />
            )}
          </Switch>
        </main>
      </div>

      <CandidateCard />
      <UpdateUserInfo />
      <ChangeAvatar />
      <ChangeEmail />
      <ChangePassword />
      <CreatePost />
      <BlockedUsers />
    </React.Fragment>)
}
