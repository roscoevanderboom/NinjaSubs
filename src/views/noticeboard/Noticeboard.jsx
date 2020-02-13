import React, { useContext, useEffect } from 'react';
import GlobalState from '../../state/store';

import { Col } from "reactstrap";

import Card from '../../components/NoticeboardCard/Card';

export default () => {
    const { state, filters, setState } = useContext(GlobalState);
    const { profileData, noticeboardQuery, searchList } = state;

    useEffect(() => {
        if (profileData && noticeboardQuery) {
            profileData.type === 'Substitute'
                ? setState.setCurrentList(filters.filterNoticeboard('sub', noticeboardQuery, profileData))
                : setState.setCurrentList(filters.filterNoticeboard('emp', noticeboardQuery, profileData))
        }
        // eslint-disable-next-line
    }, [noticeboardQuery, profileData])

    return (profileData &&
        <React.Fragment>
            {searchList.length > 0 ? null :
                <span className="text-muted mt-3">
                    <small>No Job Posts</small>
                </span>}
            <Col xs='12' sm='8' md='7' lg='6' xl='5' className='mt-2 p-0'>
                {searchList.map((post, i) => <Card key={i} post={post} />)}
            </Col>
        </React.Fragment>
    )
}