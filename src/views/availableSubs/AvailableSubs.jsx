import React, { useContext, useEffect } from 'react';
import GlobalState from '../../state/store';

import SubCard from '../../components/AvailableSubcard/SubCard'

export default () => {
    const { state, filters, setState } = useContext(GlobalState);
    const { profileData, availableSubs, searchList } = state;

    useEffect(() => {
        if (profileData && availableSubs) {
            setState.setCurrentList(filters.filterAvailableSubs(availableSubs, profileData));
        }
        // eslint-disable-next-line     
    }, [availableSubs, profileData])

    return (availableSubs &&
        <React.Fragment>
            {searchList.length > 0 ? null :
                <span className="text-muted mt-3">
                    <small>No Available Subs</small>
                </span>}
            {searchList.map((sub, i) =>
                <SubCard key={i} sub={sub} />
            )}
        </React.Fragment>
    )
}