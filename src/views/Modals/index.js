import React from "react";

import JobPostModal from './JobPostModal/CreatePost';
import BlockedUsers from 'views/Settings/BlockedUsers';
import ChangeEmail from 'views/Settings/ChangeEmail';
import ChangePassword from 'views/Settings/ChangePassword';

export default () => {
    return (
        <React.Fragment>
            <JobPostModal />
            <BlockedUsers />
            <ChangeEmail /> 
            <ChangePassword />
        </React.Fragment>
    );
}
