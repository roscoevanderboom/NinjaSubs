import React, { useContext, useEffect } from 'react';
import { Route, Switch } from "react-router-dom";
// State
import store from 'state';

// Actions
import { onAuthStateChanged } from './actions/auth';
import { watchProfileData } from './actions/user';
import { queryNoticeboard } from './actions/noticeboard';
import { queryAvailableSubs } from './actions/availableSubs';
import { handleInbox } from './actions/privatechat';

// Components
import Loader from 'components/Loader';
import JobPostModal from 'components/JobPostModal';
// pages for this product
import LoginPage from "views/LoginPage/LoginPage";
import CreateProfile from 'views/CreateProfile';
import ProfilePage from "views/ProfilePage";
import Activities from 'views/Activities';
import Settings from 'views/Settings';
import Noticeboard from 'views/Noticeboard';
import AvailableSubs from "views/AvailableSubs";
import Inbox from 'views/Inbox';
import Chatroom from 'views/Inbox/ChatArea';

export default function App() {
    const { hist, dispatch, state } = useContext(store);
    const { user, profileData } = state;

    useEffect(() => {
        onAuthStateChanged(dispatch, hist);
    }, [])

    useEffect(() => {
        if (user !== null) {
            watchProfileData(user, dispatch, hist);
        }
    }, [user]);

    useEffect(() => {
        if (profileData) {
            queryNoticeboard(dispatch);
            queryAvailableSubs(dispatch);
            handleInbox(user, dispatch);
        }
    }, [profileData])

    // useEffect(() => {
    //     console.log(state);
    // }, [state])

    return (
        <React.Fragment>
            <Loader />
            <JobPostModal />
            <Switch>
                <Route path="/login-page" component={LoginPage} />
                <Route path="/createProfile-page" component={CreateProfile} />
                <Route path="/profile-page" component={ProfilePage} />
                <Route path="/settings" component={Settings} />
                <Route path="/activities" component={Activities} />
                <Route path="/noticeboard" component={Noticeboard} />
                <Route path="/availableSubs" component={AvailableSubs} />
                <Route path="/inbox" component={Inbox} />
                <Route  path="/chatroom" component={Chatroom} />
            </Switch>
        </React.Fragment>

    )
}