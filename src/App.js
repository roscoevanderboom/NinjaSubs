import React, { useContext, useEffect } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
// State
import GlobalState from './state';

// pages for this product
import Components from "views/Components/Components.js";
import LandingPage from "views/LandingPage";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import Loader from 'components/Loader';
import CreateProfile from 'views/CreateProfile';

export default function App() {
    const { state, methods, fb } = useContext(GlobalState);
    useEffect(() => {
        methods.handleAuthState();
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (state.user !== false && state.user !== null) {
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
                <Route path="/" exact component={LandingPage} />
                <Route path="/login-page" component={LoginPage} />
                <Route path="/createProfile-page" component={CreateProfile} />
                <Route path="/profile-page" component={ProfilePage} />                
                <Route path="/components-page" component={Components} />
            </Switch>
            {!state.user || state.user === null
                ? <Redirect to='/' />
                : <Redirect to='/profile-page' />}
        </React.Fragment>

    )
}