import React, { useContext, useEffect, useState } from 'react';
import { GlobalState } from '../../state';

import JobCard from '../components/jobcard';

// Styles
import { Button } from '@material-ui/core';

import { useStyles } from './styles';

export default () => {
    const classes = useStyles();
    const { state, methods } = useContext(GlobalState);
    const { profileData, activitiesQuery, noticeboardQuery } = state;
    const { queryActivities, queryNoticeboard, handleModals, setTitle } = methods;
    const [list, setList] = useState([]);

    useEffect(() => {
        setTitle('Activities')
        // eslint-disable-next-line
    }, [])
    useEffect(() => {
        if (profileData.type === "Substitute") {
            queryNoticeboard();
            return;
        };
        if (profileData.type === "Employer") {
            queryActivities();
            return;
        };
        // eslint-disable-next-line
    }, [profileData.type])

    useEffect(() => {
        if (profileData.type === 'Substitute') {
            setList(noticeboardQuery.filter(job => job.candidates_uid.includes(profileData.uid)));
            return;
        }
        // eslint-disable-next-line
    }, [noticeboardQuery]);

    useEffect(() => {
        if (profileData.type === 'Employer') {
            setList(activitiesQuery);
            return;
        }
        // eslint-disable-next-line
    }, [activitiesQuery])

    return (
        <div className={classes.root}>
            {profileData.type === 'Employer' && list.length < 4
                ? <Button
                    onClick={() => handleModals('CreatePost')}
                    className={classes.addBtn}>
                    Create New Post
                </Button>
                : null}
            {list.length === 0 ? <h3>No Activities</h3> :
                <React.Fragment>
                    {list.map((post, i) =>
                        <JobCard
                            key={i}
                            data={post} />
                    )}
                </React.Fragment>}
        </div>
    )
}
