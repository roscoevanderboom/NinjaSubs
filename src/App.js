import React, { useContext, useEffect } from 'react';
import { Route, Switch } from "react-router-dom";
// State
import GlobalState from 'state';

// pages for this product
import LoginPage from "views/LoginPage/LoginPage";
import Loader from 'components/Loader';
import AvailableSubs from "views/AvailableSubs";
import ProfilePage from "views/ProfilePage";
import CreateProfile from 'views/CreateProfile';
import Activities from 'views/Activities';
import Noticeboard from 'views/Noticeboard';
import Inbox from 'views/Inbox';
import Settings from 'views/Settings';
import Chatroom from 'views/Inbox/ChatArea';
// Modals
import Modals from 'views/Modals';
import Notifications from 'views/Notifications';

// Get notification permission from user
// Notification.requestPermission(function (status) {
//     console.log('Notification permission status:', status);
// });

export default function App() {
    const { state, methods } = useContext(GlobalState);

    useEffect(() => {
        methods.handleAuthState();
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (state.user && state.user !== null) {
            methods.handleProfileData();
            methods.queryNoticeboard();
            methods.queryAvailableSubs();
            methods.handleInbox();
        }
        // eslint-disable-next-line
    }, [state.user])

    return (
        <React.Fragment>
            <Loader />
            <Switch>
                <Route exact path="/" component={LoginPage} />
                <Route exact path="/login-page" component={LoginPage} />
                <Route exact path="/createProfile-page" component={CreateProfile} />
                <Route exact path="/profile-page" component={ProfilePage} />
                <Route exact path="/noticeboard" component={Noticeboard} />
                <Route exact path="/activities" component={Activities} />
                <Route exact path="/availableSubs" component={AvailableSubs} />
                <Route exact path="/contacts" component={Inbox} />
                <Route exact path="/settings" component={Settings} />
                <Route exact path="/chatroom" component={Chatroom} />
            </Switch>
            <Modals />
            <Notifications />
        </React.Fragment>

    )
}