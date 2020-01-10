import React, { useContext, useEffect, useState } from 'react';
import { GlobalState } from '../../state';

// Custom components
import SubCard from './SubCard';

export default () => {
    const { state, methods } = useContext(GlobalState);
    const { availableSubs, classes, profileData } = state;
    const { handleAvailableSubs } = methods;
    const [list, setList] = useState([]);

    useEffect(() => {
        if (profileData) {
            handleAvailableSubs();
        }
        console.log('TODO -- improve design subCard')
        // eslint-disable-next-line
    }, [profileData])

    useEffect(() => {
        let subs = availableSubs.filter((sub) =>
            !profileData.blackList.includes(sub.uid)
            && sub.uid !== profileData.uid);
        setList(subs)
    }, [availableSubs, profileData])

    return (
        <div className={classes.root}>
            {list.length === 0 ? <h3>No subs available</h3> :
                <React.Fragment>
                    {list.map((sub, i) =>
                        <SubCard key={i} sub={sub} />
                    )}
                </React.Fragment>
            }
        </div>
    )
}