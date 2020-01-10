/*eslint-disable */
import React, { useContext, useEffect, useState } from 'react';
import { GlobalState } from '../../state';

// Custom components
import JobCard from '../components/jobcard';

export default () => {
    const { state, methods } = useContext(GlobalState);
    const { profileData, noticeboardQuery, classes } = state;
    const { setTitle, queryNoticeboard } = methods;
    const [list, setList] = useState([]);

    const filterlist = () => {
        var filtered = noticeboardQuery.filter(job =>
            !job.candidates_uid.includes(profileData.uid)
            && !profileData.ignoreList.includes(job.ref)
        );
        setList(filtered);
    }

    useEffect(() => {
        setTitle('Noticeboard')
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (profileData) {
            queryNoticeboard();
        }
    }, [profileData])

    useEffect(() => {
        filterlist();
    }, [noticeboardQuery])

    return (
        <div className={classes.root}>
            {list.length === 0 ? <h3>No positions available</h3> :
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
