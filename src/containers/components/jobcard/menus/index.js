import React from 'react';

import { GlobalState } from '../../../../state';

import ActivitiesMenuEmployer from './ActivitiesMenuEmployer';
import ActivitiesMenuSubs from './ActivitiesMenuSubs';
import NoticeboardMenu from './NoticeboardMenu';

export default ({ data }) => {
    const { state } = React.useContext(GlobalState);
    const { profileData, title } = state;

    if (profileData.type === 'Substitute' && title === 'Noticeboard') {        
        return (
            <NoticeboardMenu data={data} />
        )
    };
    if (profileData.type === 'Employer' && title === 'Activities') {        
        return (
            <ActivitiesMenuEmployer data={data} />
        )
    };
    if (profileData.type === 'Substitute' && title === 'Activities') {       
        return (
            <ActivitiesMenuSubs data={data} />
        )
    }
    return null
}
